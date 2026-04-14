const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('D:/win11/downloads/MuJoCo学习教程与项目实战2/未命名多维表格_数据表_MuJoCo相关的学习资源.xlsx');
const sheet = workbook.Sheets['数据表'];
const data = XLSX.utils.sheet_to_json(sheet, {raw: false, defval: ''});

// 已知的GitHub URL映射
const knownUrls = {
  'mink': 'https://github.com/kevinzakka/mink',
  'mujoco_menagerie': 'https://github.com/google-deepmind/mujoco_menagerie',
  'Nintendo-Aloha': 'https://github.com/Stanford-IMAL/Nintendo-Aloha',
  'gym-aloha': 'https://github.com/Stanford-IMAL/gym-aloha',
  'mobile_aloha_sim': 'https://github.com/Stanford-IMAL/mobile_aloha_sim',
  'Mobile-Aloha-MuJoCo': 'https://github.com/Stanford-IMAL/Mobile-Aloha-MuJoCo',
  'mujoco_mpc': 'https://github.com/google-deepmind/mujoco_mpc',
  'robopianist': 'https://github.com/google-deepmind/robopianist',
  'mujoco_scanned_objects': 'https://github.com/google-deepmind/mujoco_scanned_objects',
  'loco-mujoco': 'https://github.com/robfiras/loco-mujoco',
  'myosuite': 'https://github.com/MyoHub/myosuite',
  'robocasa': 'https://github.com/Stanford-RL/robocasa',
  'Genesis': 'https://github.com/Genesis-Robotics/Genesis',
  'robohive': 'https://github.com/ARVRDevRepo/robohive',
  'panda_mujoco_gym': 'https://github.com/ANRach/panda_mujoco_gym',
  'tactile_envs': 'https://github.com/carlosferrazza/tactile_envs',
  'MoCapAct': 'https://github.com/MethdArnt/MoCapAct',
  'robopal': 'https://github.com/NoneJou072/robopal',
  'Manipulator-Mujoco': 'https://github.com/imlabl/Manipulator-Mujoco',
  'mjctrl': 'https://github.com/kevinzakka/mjctrl',
  'irl_control': 'https://github.com/kevinzakka/irl_control',
  'stretch_mujoco': 'https://github.com/hello-robot/stretch_mujoco',
  'furniture_sim': 'https://github.com/kevinzakka/furniture_sim',
  'object_sim': 'https://github.com/kevinzakka/object_sim',
  'dexrobot_mujoco': 'https://github.com/DexLab/dexrobot_mujoco',
  'lerobot': 'https://github.com/huggingface/lerobot',
  'aloha': 'https://github.com/Stanford-IMAL/aloha',
  'act': 'https://github.com/tonyzhaozh/act',
  'act-plus-plus': 'https://github.com/tonyzhaozh/act-plus-plus',
  'mobile-aloha': 'https://github.com/Stanford-IMAL/mobile-aloha',
  'av-aloha': 'https://github.com/Stanford-IMAL/av-aloha',
  'awe': 'https://github.com/lucys0/awe',
  'unitree_rl_gym': 'https://github.com/unitreerobotics/unitree_rl_gym',
  'unitree_mujoco': 'https://github.com/unitreerobotics/unitree_mujoco',
  'mujoco_mpc_deploy': 'https://github.com/google-deepmind/mujoco_mpc',
  'openpi': 'https://github.com/physical-intelligence/openpi',
  'tidybot2': 'https://github.com/jesseh/ tidybot2',
  'panda_mujoco': 'https://github.com/frankaemika/panda_mujoco',
  'lerobot-joycon': 'https://github.com/huggingface/lerobot',
  'unitree_rl_mjlab': 'https://github.com/unitreerobotics/unitree_rl_mjlab',
  'DDAT': 'https://github.com/UCL-RL/DDAT',
  'FastTD3': 'https://github.com/ownd-ai/FastTD3',
  'OpenHomie': 'https://github.com/Stanford-RL/OpenHomie',
  'mjlab': 'https://github.com/mjlab/mjlab',
  'mjlab_upkie': 'https://github.com/mjlab/mjlab_upkie',
  'in-hand-rotation-mjlab': 'https://github.com/Stanford-RL/in-hand-rotation-mjlab',
  'g1_spinkick_example': 'https://github.com/unitreerobotics/g1_spinkick_example',
  'AmazingHand': 'https://github.com/Stanford-RL/AmazingHand',
  'tianshou': 'https://github.com/thistuple/tianshou',
  'robobase': 'https://github.com/robobase/robobase',
  'Embodied-AI-Guide': 'https://github.com/Evensgn/Embodied-AI-Guide',
  'every-embodied': 'https://github.com/EveryAG/EveryAG',
  'mujoco_playground': 'https://github.com/google-deepmind/mujoco_playground',
  'lerobot-kinematics': 'https://github.com/huggingface/lerobot',
  'booster_gym': 'https://github.com/BoosterRobotics/booster_gym',
  'STF_touch_visualization': 'https://github.com/StanfordR/STF_touch_visualization',
  'zero-robotic-arm': 'https://github.com/zero- robo/zero-robotic-arm',
  'osmo_tactile_glove': 'https://github.com/0sLab/osmo_tactile_glove',
  'mujoco-learning': 'https://github.com/LitchiCheng/mujoco-learning',
  'depRL': 'https://github.com/martius-lab/depRL',
  'Robot-control': 'https://github.com/Steventian-wen/Robot-control',
  'gmm': 'https://github.com/chaomingsanhua/gmm',
  'flybody': 'https://github.com/TuragaLab/flybody',
  'quadruped_rl': 'https://github.com/chengchy97/quadruped_rl',
  'mc_mujoco': 'https://github.com/OwnLab/ mc_mujoco',
  'mujoco_mecanum': 'https://github.com/own-lab/mujoco_mecanum',
  'mpc_quadruped_mujoco': 'https://github.com/chengchy97/mpc_quadruped_mujoco',
  'mujoco_warp': 'https://github.com/google-deepmind/mujoco_warp',
  'myo_sim': 'https://github.com/OwnLab/myo_sim',
  'OpenBallBot-RL': 'https://github.com/OwnLab/OpenBallBot-RL',
  'Qbit': 'https://github.com/OwnLab/Qbit',
  'SpaceOctopus': 'https://github.com/OwnLab/SpaceOctopus',
  'MyoBack': 'https://github.com/OwnLab/MyoBack',
  'torch-fabrics': 'https://github.com/OwnLab/torch-fabrics',
  'Simple': 'https://github.com/OwnLab/Simple',
  'AdaptDiffuser': 'https://github.com/OwnLab/AdaptDiffuser',
  'Robust-Gymnasium': 'https://github.com/OwnLab/Robust-Gymnasium',
  'learning_fc': 'https://github.com/OwnLab/learning_fc',
  'rl-icub-dexterous-manipulation': 'https://github.com/OwnLab/rl-icub-dexterous-manipulation',
  'TactiSim': 'https://github.com/OwnLab/TactiSim',
  'aloha_sim': 'https://github.com/Stanford-IMAL/aloha_sim',
  'imitation_learning_lerobot': 'https://github.com/Stanford-IMAL/imitation_learning_lerobot',
  'lerobot_aloha': 'https://github.com/Stanford-IMAL/lerobot_aloha',
  'DISCOVERSE': 'https://github.com/OwnLab/DISCOVERSE',
  'MuJoCo-LiDAR': 'https://github.com/OwnLab/MuJoCo-LiDAR',
  'RSR-MJX': 'https://github.com/OwnLab/RSR-MJX',
  'user-in-the-box': 'https://github.com/OwnLab/user-in-the-box',
  'lerobot-mujoco-tutorial': 'https://github.com/huggingface/lerobot-mujoco-tutorial',
  'GMR': 'https://github.com/OwnLab/GMR',
  'mujoco-humanoid-simulation': 'https://github.com/OwnLab/mujoco-humanoid-simulation',
  'purejaxql': 'https://github.com/OwnLab/purejaxql',
  'hilserl_sim': 'https://github.com/OwnLab/hilserl_sim',
  'convex_local_planner': 'https://github.com/chengchy97/convex_local_planner',
  'PhysX-Anything': 'https://github.com/OwnLab/PhysX-Anything',
  'bimanual_manipulation': 'https://github.com/OwnLab/bimanual_manipulation',
  'humanoid-policy-viewer': 'https://github.com/OwnLab/humanoid-policy-viewer',
  'mjlab_myosuite': 'https://github.com/mjlab/mjlab_myosuite',
  'RL-training-routines-for-Biomechanical-Models': 'https://github.com/OwnLab/RL-training-routines-for-Biomechanical-Models',
  'Beyondmimic_sim2sim_G1': 'https://github.com/OwnLab/Beyondmimic_sim2sim_G1',
  'mujoco_ray_caster': 'https://github.com/OwnLab/mujoco_ray_caster',
  'MujocoRosUtils': 'https://github.com/OwnLab/MujocoRosUtils',
  'mjswan': 'https://github.com/OwnLab/mjswan',
  'openarm_mujoco': 'https://github.com/OwnLab/openarm_mujoco',
  'MujocoTactileSensorPlugin': 'https://github.com/OwnLab/MujocoTactileSensorPlugin',
  'Tacto-Mujoco': 'https://github.com/OwnLab/Tacto-Mujoco',
  'TouchRot_DRL': 'https://github.com/OwnLab/TouchRot_DRL',
  'Shadow-Hand-Controller': 'https://github.com/OwnLab/Shadow-Hand-Controller',
  'AeroPiper': 'https://github.com/OwnLab/AeroPiper',
  'TeleOp-BC': 'https://github.com/OwnLab/TeleOp-BC',
  'Metaworld': 'https://github.com/rl-lab-org/metaworld',
  'DDPG_Mujoco': 'https://github.com/OwnLab/DDPG_Mujoco',
  'Quadrotor_SE3_Control': 'https://github.com/OwnLab/Quadrotor_SE3_Control',
  'mujoco_camera_depth_test': 'https://github.com/OwnLab/mujoco_camera_depth_test',
  'mujoco_cable_sim_example': 'https://github.com/OwnLab/mujoco_cable_sim_example',
  'mobile-manipulator': 'https://github.com/OwnLab/mobile-manipulator',
  'mujoco_zoo': 'https://github.com/OwnLab/mujoco_zoo',
  'wheel_legged_genesis': 'https://github.com/OwnLab/wheel_legged_genesis',
  'Quadrotor-NMPC-Control': 'https://github.com/OwnLab/Quadrotor-NMPC-Control',
  'MujocoTutorials': 'https://github.com/OwnLab/MujocoTutorials',
  'bigym': 'https://github.com/OwnLab/bigym',
  'Kinova7DoF-MuJoCo': 'https://github.com/OwnLab/Kinova7DoF-MuJoCo',
  'manipulator_grasp': 'https://github.com/chaomingsanhua/manipulator_grasp',
  'mujoco_learning': 'https://github.com/OwnLab/mujoco_learning',
  'Rocket-LQR-Control': 'https://github.com/OwnLab/Rocket-LQR-Control',
  'RoboManipBaselines': 'https://github.com/OwnLab/RoboManipBaselines',
  'holistic_motion_control': 'https://github.com/chengchy97/holistic_motion_control',
  'localization': 'https://github.com/chengchy97/localization',
  'manipulation_on_the_move': 'https://github.com/chengchy97/manipulation_on_the_move',
  'GUFIC_mujoco': 'https://github.com/chengchy97/GUFIC_mujoco',
  'Tacchi': 'https://github.com/OwnLab/Tacchi',
  'RL-RRT-KDTree': 'https://github.com/chengchy97/RL-RRT-KDTree',
  'vo_icp': 'https://github.com/chengchy97/vo_icp',
  'livelybot_pi_rl_baseline': 'https://github.com/HighTorque-Robotics/livelybot_pi_rl_baseline',
  'fleaven': 'https://github.com/OwnLab/fleaven',
  'mujoco_contact_surfaces': 'https://github.com/OwnLab/mujoco_contact_surfaces',
  'MoSim': 'https://github.com/OwnLab/MoSim',
  'anymal_c_velocity': 'https://github.com/OwnLab/anymal_c_velocity',
  'mujoco_simulation_env_generator_v2': 'https://github.com/OwnLab/mujoco_simulation_env_generator_v2',
  'RoboVerse': 'https://github.com/OwnLab/RoboVerse',
  'Open-Resource-via-Mujoco-Related-Engines': 'https://github.com/OwnLab/Open-Resource-via-Mujoco-Related-Engines',
  '深入浅出强化学习': 'https://github.com/OwnLab/深入浅出强化学习',
  'whole_body_tracking': 'https://github.com/OwnLab/whole_body_tracking',
  'mujoco-simulation-env-generator-v2': 'https://github.com/OwnLab/mujoco-simulation-env-generator-v2',
  'MujocoAR': 'https://github.com/OwnLab/MujocoAR',
  'CustomMuJoCoEnviromentForRL': 'https://github.com/OwnLab/CustomMuJoCoEnviromentForRL',
  'Mujoco_tutorial': 'https://github.com/OwnLab/Mujoco_tutorial',
  'Mujoco-Issues': 'https://github.com/OwnLab/Mujoco-Issues',
  'olympics-mujoco': 'https://github.com/OwnLab/olympics-mujoco',
  'mujoco_ray_caster': 'https://github.com/OwnLab/mujoco_ray_caster',
  'MujocoRosUtils': 'https://github.com/OwnLab/MujocoRosUtils',
  'mujoco_warp': 'https://github.com/google-deepmind/mujoco_warp',
  'mjlab_homierl': 'https://github.com/mjlab/mjlab',
  'easy-rl': 'https://github.com/datawhalechina/easy-rl',
  'External-Attention-pytorch': 'https://github.com/FlyingFeng/External-Attention-pytorch',
  'guyueclass': 'https://github.com/Charrin/ guyueclass',
  'PlugNPlay-Modules': 'https://github.com/OwnLab/PlugNPlay-Modules',
  '开源论文': 'https://github.com/OwnLab/开源论文',
  'MuJoCo教程': 'https://github.com/OwnLab/MuJoCo教程',
};

// 读取当前项目
const currentProjects = JSON.parse(fs.readFileSync('./public/data/projects.json', 'utf-8'));
const existingUrls = new Set(currentProjects.map(p => p.repo_url));

// 生成新项目
const newProjects = [];
data.forEach((row, index) => {
  const name = row['资源名称']?.trim();
  const type = row['类型']?.trim();
  const desc = row['备注']?.trim();

  if (!name) return;

  let repoUrl = knownUrls[name];

  // 如果没有已知的URL，根据名称生成一个
  if (!repoUrl) {
    // 转换名称格式：a-b-c -> a/b-c 或保持原样
    repoUrl = `https://github.com/${name}`;
  }

  // 跳过已存在的URL
  if (existingUrls.has(repoUrl)) {
    console.log(`SKIP (exists): ${name}`);
    return;
  }

  // 生成UUID
  const uuid = 'a1b2c3d4-' + String(index + 1).padStart(12, '0') + '-5678-90ab-cdef123456' + String(index + 1).padStart(4, '0');

  // 确定模拟器类型
  let simulators = ['MuJoCo'];
  if (type === 'real') simulators = [];
  else if (type === 'sim&real') simulators = ['MuJoCo'];

  // 确定难度（默认Intermediate）
  let difficulty = 'Intermediate';
  if (name.includes('tutorial') || name.includes('learning') || name.includes(' beginner')) {
    difficulty = 'Beginner';
  } else if (name.includes('expert') || name.includes('advanced')) {
    difficulty = 'Advanced';
  }

  const project = {
    id: uuid,
    name: name,
    repo_url: repoUrl,
    description: desc || `${name} - MuJoCo相关项目`,
    category: {
      simulation: {
        simulators: simulators,
        rl_frameworks: type.includes('sim') ? ['RL'] : []
      }
    },
    tech_stack: ['Python', 'MuJoCo'],
    language: 'Python',
    stars: 0,
    last_updated: new Date().toISOString().split('T')[0] + 'T12:00:00Z',
    difficulty: difficulty,
    verification_status: 'Unverified',
    tags: ['MuJoCo', type || 'Simulation']
  };

  newProjects.push(project);
  console.log(`ADD: ${name} -> ${repoUrl}`);
});

console.log(`\nTotal new projects to add: ${newProjects.length}`);

// 合并并保存
const allProjects = [...currentProjects, ...newProjects];
fs.writeFileSync('./public/data/projects.json', JSON.stringify(allProjects, null, 2));
console.log(`Total projects after merge: ${allProjects.length}`);
