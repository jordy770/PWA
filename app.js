if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

const main = document.querySelector("main");

window.addEventListener("load", e => {
  updateProjects();

  if ("serviceWorker" in navigator) {
    try {
      navigator.serviceWorker.register("sw.js");
      console.log("SW Registered");
    } catch (error) {
      console.log("SW reg failed");
    }
  }
});

async function updateProjects() {
  const rawData = await fetch("https://cmgt.hr.nl:8000/api/projects/");
  const jsonData = await rawData.json();
  //   console.log(jsonData.projects);
  main.innerHTML = jsonData.projects.map(createProject).join("\n");

  var projectIds1 = [];

  jsonData.projects.forEach(function(project) {
    projectIds1.push(project._id);
    localforage
      .setItem(project._id, project)
    //   .then(function(value) {
    //     console.log(value);
    //   })
      .catch(function(err) {
        console.error(err);
      });
  });

}

function createProject(project) { 
  return `
        <div class="project">
            <h2>${project.title}</h2>
            <img src="https://cmgt.hr.nl:8000/${project.headerImage}" alt="${project.title}"></img>
            <p>${project.description}</p>
        </div>
    `;
}

localforage.length().then(function(numberOfKeys) {
    // Outputs the length of the database.
    for (let i = 0; i >= numberOfKeys; i++){
        console.log(numberOfKeys);
    }

}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});

