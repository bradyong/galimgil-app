"""Revalidate documents; content-address referenced scripts/styles; retain image cache."""
import hashlib
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlsplit, parse_qs


def digest(content):
    return hashlib.sha256(content).hexdigest()


class VersionedHTML(HTMLParser):
    def __init__(self, root):
        super().__init__(convert_charrefs=False)
        self.root = root
        self.output = []

    def handle_starttag(self, tag, attrs):
        key = 'src' if tag == 'script' else 'href' if tag == 'link' else None
        values = dict(attrs)
        url = values.get(key, '')
        parsed = urlsplit(url)
        target = (self.root / parsed.path.lstrip('/')).resolve()
        if (key and not parsed.netloc and not parsed.scheme and
                self.root in target.parents and target.suffix in ('.js', '.css') and target.is_file()):
            versioned = parsed.path + '?v=' + digest(target.read_bytes())
            attrs = [(name, versioned if name == key else value) for name, value in attrs]
            rendered = ''.join(' ' + name + ('' if value is None else '="' + escape(value, quote=True) + '"') for name, value in attrs)
            self.output.append('<' + tag + rendered + '>')
        else:
            self.output.append(self.get_starttag_text())

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag): self.output.append('</' + tag + '>')
    def handle_data(self, data): self.output.append(data)
    def handle_entityref(self, name): self.output.append('&' + name + ';')
    def handle_charref(self, name): self.output.append('&#' + name + ';')
    def handle_comment(self, data): self.output.append('<!--' + data + '-->')
    def handle_decl(self, decl): self.output.append('<!' + decl + '>')


def representation(target, request_url, root):
    content = target.read_bytes()
    suffix = target.suffix.lower()
    policy = 'no-cache, must-revalidate'
    if suffix == '.html':
        parser = VersionedHTML(root.resolve())
        parser.feed(content.decode('utf-8'))
        parser.close()
        content = ''.join(parser.output).encode('utf-8')
    elif suffix in ('.js', '.css'):
        version = parse_qs(urlsplit(request_url).query).get('v', [''])[0]
        if version == digest(content):
            policy = 'public, max-age=31536000, immutable'
    elif suffix in ('.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.woff', '.woff2'):
        policy = 'public, max-age=86400'
    return content, policy, '"' + digest(content) + '"'
