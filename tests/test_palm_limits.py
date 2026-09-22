import pathlib
import sys
import tempfile
import unittest
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from palm_limits import PalmLimits


class PalmLimitsTest(unittest.TestCase):
    def setUp(self):
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        self.path = pathlib.Path(folder.name) / "usage.db"

    def test_ip_boundary_and_persistence(self):
        limits = PalmLimits(self.path)
        for _ in range(29):
            self.assertIsNone(limits.reserve("ip1"))
        self.assertIsNone(PalmLimits(self.path).reserve("ip1"))
        self.assertEqual(limits.reserve("ip1"), "ip")
        self.assertIsNone(limits.reserve("ip2"))

    def test_global_boundary_across_ips(self):
        limits = PalmLimits(self.path)
        for n in range(300):
            self.assertIsNone(limits.reserve(str(n)))
        self.assertEqual(limits.reserve("new"), "global")

    def test_next_day_resets(self):
        day = ["2026-09-22"]
        limits = PalmLimits(self.path, per_ip=1, global_limit=1, day=lambda: day[0])
        self.assertIsNone(limits.reserve("ip"))
        self.assertEqual(limits.reserve("ip"), "ip")
        day[0] = "2026-09-23"
        self.assertIsNone(limits.reserve("ip"))

    def test_concurrent_ip_boundary(self):
        limits = PalmLimits(self.path)
        with ThreadPoolExecutor(max_workers=8) as pool:
            results = list(pool.map(limits.reserve, ["same"] * 50))
        self.assertEqual(results.count(None), 30)
        self.assertEqual(results.count("ip"), 20)

    def test_zero_cannot_disable_safety(self):
        with self.assertRaises(ValueError):
            PalmLimits(self.path, global_limit=0)

    def test_concurrent_global_boundary(self):
        limits = PalmLimits(self.path, global_limit=10)
        with ThreadPoolExecutor(max_workers=8) as pool:
            results = list(pool.map(limits.reserve, map(str, range(30))))
        self.assertEqual(results.count(None), 10)
        self.assertEqual(results.count("global"), 20)


if __name__ == "__main__":
    unittest.main()
