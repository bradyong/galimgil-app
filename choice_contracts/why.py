"""Approved WHY expressions, mechanically extracted without edits."""
import hashlib

WHY_PATTERNS=(
 '의미 근거로는 우열을 가리지 않았어요. 별자리·카드·마음 온도로 뽑은 놀이 한 표는 ‘{winner}’!',
 '현실적인 우열 대신 가벼운 놀이로 골랐어요. 오늘의 갈림길 표는 ‘{winner}’ 쪽입니다.',
 '이유로 앞선 선택은 아니에요. 오늘 별과 카드가 섞인 놀이표는 ‘{winner}’에 살짝!',
 '어느 쪽이 더 낫다는 뜻은 아니에요. 오늘의 작은 놀이 기울기는 ‘{winner}’ 쪽!',
 '의미상 더 좋은 쪽을 정한 건 아니에요. 별자리와 카드를 섞어 가볍게 ‘{winner}’!',
 '오늘은 우열 비교 대신 놀이 한 표로 갑니다. 갈림길이 뽑은 쪽은 ‘{winner}’!',
 '‘{winner}’에 오늘의 장난스러운 한 표! 실제 장점이 더 많다는 판정은 아니에요.',
 '현실의 정답은 잠시 내려놓고, 오늘 놀이표는 ‘{winner}’에 도착했어요.',
)

def why(row):
    if row['score_source']!='PURE_PLAY':return row['why'],None
    digest=hashlib.sha256(('why-v1:'+row['seed_sha256']).encode()).digest()
    index=int.from_bytes(digest[:8],'big')%len(WHY_PATTERNS)
    return WHY_PATTERNS[index].format(winner=row['winner']),index
