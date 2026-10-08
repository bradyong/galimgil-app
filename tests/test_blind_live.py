import unittest
from unittest.mock import patch
import blind_live as live

class BlindLiveTests(unittest.TestCase):
    def test_saved_failed_attempt_is_never_retried(self):
        ledger={'requests':{'x':{'status':'error','charged_or_reserved':.001}}}
        def forbidden(body):raise AssertionError('retried')
        self.assertEqual(live.call_once(ledger,'x',{},forbidden)['status'],'error')

    def test_budget_reservation_precedes_network(self):
        ledger={'requests':{'old':{'charged_or_reserved':.0999}}}
        with self.assertRaises(live.BudgetStop):
            live.call_once(ledger,'x',{'max_output_tokens':650},lambda b:self.fail('network'))
        self.assertNotIn('x',ledger['requests'])

    def test_attempt_saved_before_transport_and_failure_retained(self):
        ledger={'requests':{}}
        def fail(body):
            self.assertEqual(ledger['requests']['x']['status'],'attempted')
            raise TimeoutError()
        with patch.object(live,'save') as saved:
            result=live.call_once(ledger,'x',{'max_output_tokens':650},fail)
            self.assertEqual(saved.call_count,2)
        self.assertEqual(result['status'],'error')
        self.assertEqual(result['charged_or_reserved'],result['reserved'])

    def test_independent_automatic_fields(self):
        result=live.automatic({'future':'내일이면 모든 일이 해결될 것이다.','capture':'오늘의 농담은 제가 맡겠습니다.'},{'a':'A','b':'B'})
        self.assertIn('prediction-style',result['future'])
        self.assertEqual(result['capture'],[])
