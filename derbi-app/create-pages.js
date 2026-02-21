const fs = require('fs');
const path = require('path');

const pages = [
    { file: 'Home.jsx', name: 'Home' },
    { file: 'Portfolio.jsx', name: 'Portfolio' },
    { file: 'PrayasShalaLab.jsx', name: 'Prayas Shala Lab' },
    { file: 'Partners.jsx', name: 'Partners' },
    { file: 'CurrentPrograms.jsx', name: 'Current Programs' },
    { file: 'about/AboutUs.jsx', name: 'About Us' },
    { file: 'about/DirectorsMessage.jsx', name: 'Directors Message' },
    { file: 'about/GoverningCouncil.jsx', name: 'Governing Council' },
    { file: 'about/Team.jsx', name: 'Team' },
    { file: 'about/Mentors.jsx', name: 'Mentors' },
    { file: 'programs/Pace.jsx', name: 'PACE' },
    { file: 'programs/Gallop.jsx', name: 'GALLOP' },
    { file: 'programs/Emerge.jsx', name: 'EMERGE' },
    { file: 'programs/Bionest.jsx', name: 'BIONEST' },
    { file: 'funding/NidhiEir.jsx', name: 'NIDHI EiR' },
    { file: 'funding/NidhiPrayas.jsx', name: 'NIDHI PRAYAS' },
    { file: 'funding/MeityTide.jsx', name: 'MeitY Tide 2.0' },
    { file: 'funding/NidhiSss.jsx', name: 'NIDHI SSS' },
    { file: 'funding/Sisfs.jsx', name: 'SISFS' },
];

const basePath = path.join(__dirname, 'src', 'pages');

pages.forEach(({ file, name }) => {
    const fullPath = path.join(basePath, file);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const componentName = file.split('/').pop().replace('.jsx', '');

    const content = [
        "import React from 'react';",
        "",
        "const " + componentName + " = () => {",
        "  return (",
        "    <div className=\"min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8\">",
        "      <div className=\"bg-white rounded-lg shadow-xl p-12 max-w-4xl w-full text-center\">",
        "        <h1 className=\"text-4xl font-extrabold text-blue-800 mb-6\">" + name + "</h1>",
        "        <p className=\"text-gray-600 text-lg\">",
        "          Welcome to the " + name + " page. This is a dedicated page mapped via React Router DOM.",
        "        </p>",
        "      </div>",
        "    </div>",
        "  );",
        "};",
        "",
        "export default " + componentName + ";"
    ].join('\\n');

    fs.writeFileSync(fullPath, content);
    console.log("Created " + file);
});
