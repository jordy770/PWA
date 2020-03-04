if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

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

  if (navigator.onLine) {
    fetch("https://cmgt.hr.nl:8000/api/projects/tags")
      .then(response => {
        return response.json();
      })
      .then(data => {
        var text = "";

        for (let i = 0; i < data.tags.length; i++) {
          text += data.tags[i] + "<br>";
        }
        document.getElementById("status").innerHTML = text;
      });
  } else {
    document.getElementById("status").innerHTML = "The app is OFFLINEEEEEE";
  }
});

async function updateProjects() {
  const rawData = await fetch("https://cmgt.hr.nl:8000/api/projects/");
  const jsonData = await rawData.json();
  jsonData.projects.map(createProject);

  jsonData.projects.forEach(function(project) {
    localforage.setItem(project._id, project).catch(function(err) {
      console.error(err);
    });
  });
}

function createProject(project) {
  localforage
    .getItem(project._id)
    .then(function(project) {
      document.querySelector("main").insertAdjacentHTML(
        "afterbegin",
        `<div class="project">
        <h2>${project.title}</h2>
        <img src="https://cmgt.hr.nl:8000/${project.headerImage}" alt="${project.title}"></img>
        <p>${project.description}</p>
      </div>`
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}
