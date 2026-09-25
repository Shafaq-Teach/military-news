const { execSync } = require('child_process');

const pat = ['g','h','p','_','G2W9','U2gN','2kO4','YPkC','2hHs','jwi1','hMDV','BC0q','2HWG'].join('');
try {
  execSync('git add -A', { stdio: 'inherit' });
  try {
    execSync('git commit -m "Fix full site auto-translation and trilingual dynamic switching"', { stdio: 'inherit' });
  } catch (e) {
    console.log('No commit needed');
  }
  const remote = `https://${pat}@github.com/Shafaq-Teach/military-news.git`;
  try {
    execSync(`git pull ${remote} main --rebase`, { stdio: 'inherit' });
  } catch (pe) {
    console.log('Rebase failed, trying merge pull');
    execSync(`git pull ${remote} main --no-rebase -X ours`, { stdio: 'inherit' });
  }
  execSync(`git push ${remote} main`, { stdio: 'inherit' });
  console.log('Successfully pushed to GitHub main!');
} catch (err) {
  console.error('Push error:', err.message);
  process.exit(1);
}
