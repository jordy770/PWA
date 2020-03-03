if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

// const main = document.querySelector('main');

//Add a eventlistener
window.addEventListener('load', e => {
    updateProjects();

    //Include serviceWorker
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

    //Open the database
    let req = window.indexedDB.open("projectsDB", 1),
    db, 
    trans,
    store,
    index; 
    // main.innerHTML = jsonData.projects.map(createProject).join('\n');

    req.onupgradeneeded = function(event){
        console.log('upgrade!');
        console.log(event.target);

        //Store the result of opening the database in the db variable
        let db = req.result, 
        //Create an objectStore for this database
        store = db.createObjectStore("projectsStore", { keyPath:"_id" }),
        index = store.createIndex("_id", "_id", { unique:true });

        // console.log(store);
    }

    req.onerror = function(event){
        console.log('error');
        console.log('error' + event.target.errorCode);
    }
    req.onsuccess = function(){
        console.log('succes');
        db = req.result;

        // Put store values in the newly created objectStore
        trans = db.transaction("projectsStore", "readwrite");
        store = trans.objectStore("projectsStore");
        index = store.index("_id");

        const len = jsonData.projects.length;

        var getAllRequest = index.getAll();
        getAllRequest.onsuccess = function() {

            for (var i = 0; i < len; i += 1) {
                console.log(jsonData.projects[i].title);

                document.write('<div class="title">' + jsonData.projects[i].title + '</div>');
                document.write('<img src="https://cmgt.hr.nl:8000/' + jsonData.projects[i].headerImage + '"></img>');
            }
        }   
        
        db.onerror = function(event) {
            console.log('error:' + event.target.errorCode);
        }

        for(let project in jsonData.projects) { 
            // Put this updated object back into the database.
            store.put(jsonData.projects[project]);
        }

        trans.oncomplete = function () {
            db.close();
            console.log("close database");
        }
    }
}

// function createProject(project) {
//     return `
//         <div class="project">
//             <h2>${project.title}</h2>
//             <img src="https://cmgt.hr.nl:8000/${project.headerImage}" alt="${project.title}"></img>
//             <p>${project.description}</p>
//         </div>
//     `;
// }