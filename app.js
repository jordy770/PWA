// const main = document.querySelector('main');

// window.addEventListener('load', e => {
//     updateProjects();

//     if ('serviceWorker' in navigator) {
//         try {
//             navigator.serviceWorker.register('sw.js');
//             console.log('SW Registered')
//         } catch (error) {
//             console.log('SW reg failed')

//         }
//     }
// });

// async function updateProjects() {
//     const res = await fetch('https://cmgt.hr.nl:8000/api/projects/');
//     const json = await res.json();

//     main.innerHTML = json.projects.map(createProject).join('\n');
// }



// const dbName = this.result;

// const request = indexedDB.open("projectsDB", 1);

// request.onerror = function(event){
//   console.log(event);
// }

// request.onsuccess = function(event){
//   console.log("success");
// }

// request.onupgradeneeded = function(event){
//   const db = event.target.result;
//   const objectStore = db.createObjectStore("projects", { keyPath: "id", autoIcrement: true });

//   objectStore.createIndex("title", "title", { unique: false });
// }

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const main = document.querySelector('main');

window.addEventListener('load', e => {
    updateProjects();

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW Registered')
        } catch (error) {
            console.log('SW reg failed')

        }
    }
});

async function updateProjects() {
    const rawData = await fetch('https://cmgt.hr.nl:8000/api/projects/');
    const jsonData = await rawData.json();
    console.log(jsonData.projects);
    main.innerHTML = jsonData.projects.map(createProject).join('\n');
    var db = window.indexedDB.open("projectsDB", 1);
    db.onerror = function(event){
        console.log('error');
    }
    db.oncomplete = function(){
        console.log('complete');
    }
    db.onsuccess = function(){
        console.log('succes');
        console.log(db);
    }
    db.onupgradeneeded = function(event){
        console.log('upgrade!');
        console.log(event.target);
        let objectStore = db.createObjectStore("project", { keyPath: "id" });

            for (let i in jsonData) {
                objectStore.add(jsonData.projects[i]);
            }
    }
    
        // .onerror(function(event){
        //     console.log("error: ");
        // })
        // .onsuccess(e, (event) => {
        //     db = request.result;
        //     console.log("success: " + db);
        // })  
        // .onupgradeneeded(e, (event) => {
        //     var db = event.target.result;
        //     var objectStore = db.createObjectStore("project", { keyPath: "id" });

        //     for (let i in jsonData) {
        //         objectStore.add(jsonData.projects[i]);
        //     }
        // }
        // ).oncomplete(e, (event) => {
        //     console.log(e);
        //     console.log(event);
        // });

    // transaction = db.transaction(["project"], "readwrite")
    //     .oncomplete(e, (event) => {
    //         console.log("data added");
    //     })
    //     .onerror(e, (event) => {
    //         console.log(" erooorrrrrrrrrrr")
    //     })
    //     console.log(projectsDB);

}

// var db;
// var request = window.indexedDB.open("projectsDB", 1);

// request.onerror = function (event) {
//     console.log("error: ");
// };
// request.onsuccess = function (event) {
//     db = request.result;
//     console.log("success: " + db);
// };

// request.onupgradeneeded = function (event) {
//     var db = event.target.result;
//     var objectStore = db.createObjectStore("project", { keyPath: "id" });

//     for (var i in jsonData) {
//         objectStore.add(jsonData[i]);
//     }
// }

// function add(){
//     const rawData = await fetch('https://cmgt.hr.nl:8000/api/projects/');
//     const jsonData = await rawData.json();
//     var request = db.transaction(["projectsDB"], "readwrite")
//     .objectStore("projectsDB")
//     .add(jsonData);
    
//     request.onsuccess = function(event) {
//        alert("Kenny has been added to your database.");
//     };
    
//     request.onerror = function(event) {
//        alert("Unable to add data\r\nKenny is aready exist in your database! ");
//     }
// }

function createProject(project) {
    return `
        <div class="project">
            <h2>${project.title}</h2>
            <img src="https://cmgt.hr.nl:8000/${project.headerImage}" alt="${project.title}"></img>
            <p>${project.description}</p>
        </div>
    `;
}