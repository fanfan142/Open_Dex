import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 手动读取并校验数据
const DATA_FILE_PATH = path.resolve(__dirname, '../public/data/projects.json');

console.log('开始校验数据...\n');

if (!fs.existsSync(DATA_FILE_PATH)) {
  console.error(`错误：找不到数据文件 ${DATA_FILE_PATH}`);
  process.exit(1);
}

let rawData: string;
try {
  rawData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
} catch (error) {
  console.error('错误：无法读取数据文件:', error);
  process.exit(1);
}

let jsonData: unknown;
try {
  jsonData = JSON.parse(rawData);
} catch (error) {
  console.error('错误：JSON 格式不正确:', error);
  process.exit(1);
}

// 基础校验
if (!Array.isArray(jsonData)) {
  console.error('错误：数据必须是数组格式');
  process.exit(1);
}

const projects = jsonData as any[];

console.log(`总计 ${projects.length} 个项目\n`);

// 验证每个项目的基本字段
const requiredFields = ['id', 'name', 'repo_url', 'description', 'tech_stack', 'language', 'stars', 'last_updated', 'difficulty', 'verification_status', 'tags'];

let hasErrors = false;

projects.forEach((project, index) => {
  const missingFields = requiredFields.filter(field => !(field in project));

  if (missingFields.length > 0) {
    console.error(`项目 ${index + 1} (${project.name || 'Unknown'}) 缺少字段: ${missingFields.join(', ')}`);
    hasErrors = true;
  }

  // 验证ID格式
  if (project.id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(project.id)) {
    console.error(`项目 ${index + 1} (${project.name}) 的ID格式不正确: ${project.id}`);
    hasErrors = true;
  }

  // 验证日期格式
  if (project.last_updated) {
    const date = new Date(project.last_updated);
    if (isNaN(date.getTime())) {
      console.error(`项目 ${index + 1} (${project.name}) 的日期格式不正确: ${project.last_updated}`);
      hasErrors = true;
    }
  }

  // 验证verification_status
  const validStatuses = ['Verified', 'Partial', 'Paper-Only', 'Unverified'];
  if (project.verification_status && !validStatuses.includes(project.verification_status)) {
    console.error(`项目 ${index + 1} (${project.name}) 的验证状态不正确: ${project.verification_status}`);
    hasErrors = true;
  }

  // 验证difficulty
  const validDifficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  if (project.difficulty && !validDifficulties.includes(project.difficulty)) {
    console.error(`项目 ${index + 1} (${project.name}) 的难度不正确: ${project.difficulty}`);
    hasErrors = true;
  }
});

// 统计信息
const stats = {
  verified: 0,
  partial: 0,
  paperOnly: 0,
  unverified: 0
};

projects.forEach(p => {
  switch (p.verification_status) {
    case 'Verified': stats.verified++; break;
    case 'Partial': stats.partial++; break;
    case 'Paper-Only': stats.paperOnly++; break;
    case 'Unverified': stats.unverified++; break;
  }
});

console.log('验证状态统计:');
console.log(`   - 已验证: ${stats.verified}`);
console.log(`   - 部分复现: ${stats.partial}`);
console.log(`   - 仅论文: ${stats.paperOnly}`);
console.log(`   - 未验证: ${stats.unverified}`);

if (hasErrors) {
  console.error('\n数据校验失败！');
  process.exit(1);
} else {
  console.log('\n数据校验通过！');
  process.exit(0);
}
