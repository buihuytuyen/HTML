// var users = [
//     {
//         id: 1,
//         username: 'Bui Huy Tuyen'
//     } ,
//     {
//         id: 2,
//         username: 'Vu Quang Thanh'
//     } ,
//     {
//         id: 3,
//         username: 'Nguyen Duc Cuong'
//     } 
// ]


// // console.log(user);


// var comments = [
//     {
//         id: 1,
//         user_id: 1,
//         content: 'Hi anh',
//     },
//     {
//         id: 2,
//         user_id: 2,
//         content: 'Hi em',
//     },
//     {
//         id: 3,
//         user_id: 1,
//         content: 'Bye anh',
//     },
//     {
//         id: 4,
//         user_id: 2,
//         content: 'Oke bye em',
//     },
// ]

// function getComments(){
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve(comments);
//         }, 1000);
//     });
// }

// function getUsersByIds(userIds) {
//    return new Promise(function(resolve) {
//         var result = users.filter(function(user) {
//             return userIds.includes(user.id);
//         });
//         setTimeout(function() {
//             resolve(result);
//         }, 1000);
//    }); 
// }

// getComments()
//     .then(function(comments){
//         var userIds = comments.map(function(comment){
//             return comment.user_id;
//         })
//         return getUsersByIds(userIds)
//             .then(function(users){
//                 return {
//                     users: users,
//                     comments: comments
//                 } ;
//             })
//     })
//     .then(function(data){
//         var commentBlock = document.getElementById('comment-block');

//         var html = '';

//         data.comments.forEach(function(comment){
//             var user = data.users.find(function(user){
//                 return user.id == comment.user_id;
//             });

//             html += `<li>${user.username}: ${comment.content}</li>`
//         })

//         commentBlock.innerHTML = html;
//     });



    // var courseApi = 'http://localhost:3000/courses'

    // fetch(courseApi)
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(courses){
    //         console.log(courses);
    //     });









var courseApi = 'http://localhost:3000/courses';

function start(){
    getCourse(renderCourses);
    handleCreateForm();
}

start();



// Functions


function getCourse(callback){
    fetch(courseApi)
       .then(function(response){
            return response.json();
        })
       .then(callback)
}

function createCourse(data, callback){

    var t = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };

    fetch(courseApi, t)
        .then(function(response){   
            response.json(); 
        })
        .then(callback)
}

function handleDeleteCourse(id){
    var t = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(courseApi + '/' + id, t)
        .then(function(response){   
            response.json(); 
        })
        .then(function(){
            getCourse(renderCourses);
            
        })
}

function renderCourses(courses){
    var listCourseBlock = 
        document.querySelector('#list-courses');
    
    var html = courses.map(function(course){
        return `
            <li>
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
            </li>
        `;
    });
    listCourseBlock.innerHTML = html.join('');
}


function handleCreateForm(){
    var createBtn = document.querySelector('#create');


    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        

        console.log(name, description);

        var formData = {
            name: name,
            description: description
        };

        createCourse(formData,function(){
            getCourse(renderCourses);
        });
    }
}

