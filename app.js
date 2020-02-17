const main = document.querySelector('main');

window.addEventListener('load', e => {
    updateProjects();

    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW Registered')
        } catch (error) {
            console.log('SW reg failed')

        }
    }
});

async function updateProjects(){
    const res = await fetch('https://cmgt.hr.nl:8000/api/projects/');
    const json = await res.json();

    main.innerHTML = json.projects.map(createProject).join('\n');
}

function createProject(project){
    return `
        <div class="project">
            <h2>${project.title}</h2>
            <img src="https://cmgt.hr.nl:8000/${project.screenshots}" alt="${project.title}"></img>
            <p>${project.description}</p>
        </div>
    `;
}