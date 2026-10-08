import copy
import unittest
from meaning_only_candidate import project, ready, normalize

class CandidateTests(unittest.TestCase):
    def test_scene_independent(self):
        raw = {'meaning': {'situation':'비교', 'optionA_meaning':{'summary':'음성 전달'},
            'optionB_meaning':{'summary':'문자 전달'}, 'meaningful_difference':'전달 매체 차이',
            'uncertainty':{'level':'low'}}}
        f={'a':'음성으로 전한다','b':'글로 전한다'}
        before=project(raw,f)
        raw['meaning']['optionA_meaning']['scene']={'future':'','capture':'x'}
        self.assertEqual(before,project(raw,f))
        self.assertTrue(ready(before))

    def test_unknown_and_empty_contrast(self):
        m={'optionA_meaning':'의미 불명','optionB_meaning':'모르는 이름',
           'meaningful_difference':'확인 불가','uncertainty':{'level':'low'}}
        self.assertFalse(ready(m))
        m.update(optionA_meaning='문자 전달', optionB_meaning='음성 전달',meaningful_difference='')
        self.assertFalse(ready(m))

    def test_literal_ownership_and_swap(self):
        f={'a':'장비를 빌린다','b':'장비를 구매한다'}
        a=normalize(f)[0][0]
        b=normalize({'a':f['b'],'b':f['a']})[0][0]
        self.assertEqual((a['valueA'],a['valueB']),('temporary','own'))
        self.assertEqual(a['valueA'],b['valueB'])

    def test_social_both_sides_required(self):
        self.assertEqual(normalize({'a':'독서 모임에 참여한다','b':'혼자 읽는다'})[0][0]['id'],'social')
        self.assertEqual(normalize({'a':'독서 모임에 참여한다','b':'책을 읽는다'})[0],[])

    def test_media_and_process_do_not_prove_axis(self):
        for a,b in [('사진을 찍는다','노트에 적는다'),('먼저 검토한다','자료를 제출한다'),
                    ('버스를 탄다','차를 운전한다')]:
            self.assertEqual(normalize({'a':a,'b':b})[0],[])

    def test_time_requires_same_action_and_positive_scope(self):
        self.assertEqual(normalize({'a':'오늘 답장한다','b':'내일 답장한다'})[0][0]['id'],'immediacy')
        for a,b in [('오늘 메뉴를 먹는다','내일 답장한다'),('오늘 하지 않는다','내일 한다'),
                    ('오늘 못 한다','내일 한다')]:
            self.assertEqual(normalize({'a':a,'b':b})[0],[])

    def test_original_only_and_no_candidate_authority(self):
        f={'a':'녹음한다','b':'적는다'}
        poisoned=[{'id':'activity','valueA':'active','valueB':'passive','quoteA':f['a'],'quoteB':f['b']}]
        self.assertEqual(normalize(f,poisoned)[0],[])
        self.assertEqual(len(normalize(f,poisoned)[1]),1)

    def test_setting_requires_explicit_place(self):
        self.assertEqual(normalize({'a':'실내에서 논다','b':'실외에서 논다'})[0][0]['id'],'setting')
        self.assertEqual(normalize({'a':'차에서 쉰다','b':'기차에서 쉰다'})[0],[])

if __name__=='__main__': unittest.main()
