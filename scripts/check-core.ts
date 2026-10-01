import { runSelfCheck } from '../src/core/self-check.ts';

console.log('='.repeat(80));
console.log('          BỘ KIỂM THỬ TỰ ĐỘNG LÕI TRÒ CHƠI TIỆM MAY NẾP (CORE ENGINE)');
console.log('='.repeat(80));

const report = runSelfCheck();

console.log(`Thời gian thực hiện: ${report.timestamp}`);
console.log('-'.repeat(80));
console.log(
  `| ${'ID'.padEnd(4)} | ${'Mục kiểm tra (Check Name)'.padEnd(46)} | ${'Kết quả'.padEnd(8)} | ${'Thời gian'.padEnd(10)} |`
);
console.log('-'.repeat(80));

for (const res of report.results) {
  const idStr = String(res.id).padEnd(4);
  const nameStr = (res.name.length > 46 ? res.name.slice(0, 43) + '...' : res.name).padEnd(46);
  const statusStr = res.passed ? '\x1b[32mPASS\x1b[0m    ' : '\x1b[31mFAIL\x1b[0m    ';
  const timeStr = `${res.durationMs ?? 0} ms`.padEnd(10);
  console.log(`| ${idStr} | ${nameStr} | ${statusStr} | ${timeStr} |`);

  if (!res.passed && res.message) {
    console.log(`  \x1b[31m-> Lý do lỗi:\x1b[0m ${res.message}`);
  }
}

console.log('='.repeat(80));
console.log(
  `TỔNG KẾT: ${report.totalChecks} kiểm tra | \x1b[32mPASS: ${report.passedChecks}\x1b[0m | \x1b[31mFAIL: ${report.failedChecks}\x1b[0m`
);
console.log('='.repeat(80));

if (!report.allPassed) {
  console.error('\x1b[31mCó ít nhất một kiểm tra thất bại!\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32mToàn bộ 15 kiểm tra đều ĐẠT (PASS) thành công!\x1b[0m');
  process.exit(0);
}
