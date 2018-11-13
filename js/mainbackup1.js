function klik() {
    alert("ini sudah jalan")
}

function signUp() {
    //debugger
    var fullname, name, email, password, bio, photoprofile;
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    fullname = document.getElementById('fullname').value;
    password = document.getElementById('password').value;
    bio = document.getElementById('bio').value;
    photoprofile = document.getElementById('photoprofile').value;

    // alert("OOK")

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/signUp");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "username": name,
        "fullname": fullname,
        "email": email,
        "password": password,
        "bio": bio,
        "photoprofile": photoprofile

    }));
    // alert("masuk pak")

    xmlHttp.onreadystatechange = function () {
        // console.log(this.response)
        if (this.readyState == 4 && this.status == 201) {
            alert("Data Berhasil di Submit, code" + this.status);
            window.location = "/login.html";
        } else if (this.readyState == 4) {
            alert(this.response);
        }
    };
}

function signIn() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/login", true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "username": username,
        "password": password
    }));

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.response)

            data.forEach(function (val) {
                localStorage.setItem('id', val.id)
                document.location = "twitter.html"
            });
        } else if (this.readyState == 4) {
            alert("Login gagal! coba lagi !" + this.status);
        }
    };
}

function addtweet() {
    tweet = document.getElementById("tweet-box").value;
    Id_User = localStorage.getItem("id");
    alert(Id_User)

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://127.0.0.1:4125/addtweet");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "id": Id_User,
        "content": tweet
    }));

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            alert("tweet berhasil")
            document.location = "twitter.html"
        }
    };
}

function alltweet() {

    idlogin = localStorage.getItem('id')

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:4125/readtweet");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            JSON.parse(this.response).forEach(function (data, index) {
                // console.log(data);
                if (idlogin == data.id) {

                    document.getElementById("timeline").insertAdjacentHTML("afterbegin",
                        `<div id="tweetsfeed">
                    <div class="tweet">
                        <img src="${data.photoprofile}" class="TLprofil" alt="foto orang" height="35px" width="35px" />
                        <h3 class="TLname">${data.fullname} 
                        <a class="Iduser">${data.username}</a></h3>
                        <p>${data.content}</p>
                        <span>${data.date} </span>
                        <button type="submit" id="submit-tweet" class="TLdelete" onclick="deleteTweet('${data.idtweet}')" >Delete</button>
                    </div>
                </div>`);
                } else {
                    document.getElementById("timeline").insertAdjacentHTML("afterbegin",
                        `<div id="tweetsfeed">
                        <div class="tweet">
                            <img src="${data.photoprofile}" class="TLprofil" alt="foto orang" height="35px" width="35px" />
                            <h3 class="TLname">${data.fullname} 
                            <a class="Iduser">${data.username}</a></h3>
                            <p>${data.content}</p>
                            <span>${data.date} </span>
                        </div>
                    </div>`);
                }
            });
        }
    }
    xmlHttp.send();
};

function readPersonaltweet() {

    id = localStorage.getItem('id');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/readPersonaltweet");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "id": id
    }));

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                // console.log(data);
                document.getElementById("TimeLine").insertAdjacentHTML("afterbegin",
                    `<div id="tweetsfeed">
                    <div class="tweet">
                        <img src="${data.photoprofile}" class="TLprofil" alt="foto orang" height="35px" width="35px" />
                        <h3 class="TLname">${data.fullname} 
                        <a class="Iduser">${data.username}</a></h3>
                        <p>${data.content}</p>
                        <span>${data.date} </span>
                        <button type="submit" id="submit-tweet" class="TLdelete" onclick="deleteTweet('${data.id}')">Delete</button>
                    </div>
                </div>`);
            });
        }
    }
};
// delete tweet 
function deleteTweet(data) {

    alert(data)

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/deletetweet");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        'id_Tweet': data
    }));

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            alert("tweet has been deleted" + this.status)
            document.location = "";
        } else if (this.readyState == 4) {
            alert("Method is not Allowed" + this.status)
        }
    };
}

function getfollowlist() {

    id = localStorage.getItem('id');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/getfollowlist");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        'id': id
    }));
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                document.getElementById("box-follow").innerHTML +=
                    `<div id="friendfollow">
                <img src="${data.photoprofile}" class="FF" alt="foto orang" />
                <h3 href="" class="TLname">${data.fullname} <a class="FFname">${data.username}</a> </h3>
                <button type="submit" id="fffollow" class="TLname" onclick="addFollowing('${data.id}')">Follow</button>
                </div>`
            });
        };
    }
};
// nambah follower
function addFollowing(idFollowing) {

    id_person = localStorage.getItem('id');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/getfollowing");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        'id_person': id_person,
        'id_following': idFollowing
    }));

    xmlHttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 201) {
            alert("followed")

            document.location = "twitter.html"
        } else if (this.readyState == 4) {
            alert("follow failed")
        }
    };
}
// mwnampilkan data user di HOME profile
function getMyUserHome() {


    id = localStorage.getItem('id');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/getprofileHome");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        'id': id
    }));
    xmlHttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                document.getElementById("FullName").innerText = data.fullname
                document.getElementById("UserName").innerText = '@' + data.username
                document.getElementById("profil").src = data.photoprofile
                document.getElementById("NAVname").innerText = data.fullname
                document.getElementById("navprofil").src = data.photoprofile
                // document.getElementById("NavUsername").innerText = '@' + data.username
            });
        }
        // console.log(this.responseText, this.readyState, this.status)
    };
    // xmlHttp.send();
};

function getMyUserProfile() {


    id = localStorage.getItem('id');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/getprofileHome");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        'id': id
    }));
    xmlHttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                document.getElementById("FullName").innerText = data.fullname
                document.getElementById("UserName").innerText = '@' + data.username
                document.getElementById("Profil").src = data.photoprofile
                document.getElementById("NAVname").innerText = data.fullname
                document.getElementById("navprofil").src = data.photoprofile
                // document.getElementById("NavUsername").innerText = '@' + data.username
               
            });
        }
    };
};


function getMyUsernavbar() {

    id = localStorage.getItem('id');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/getprofileHome");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        'id': id
    }));
    xmlHttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                
            });
        }
    };
};

function formEdit() {


    id = localStorage.getItem('id');

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/getprofileHome");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        'id': id
    }));
    xmlHttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 201) {
            JSON.parse(this.response).forEach(function (data, index) {
                document.getElementById("form_fullname").value = data.fullname
                document.getElementById("form_username").value = '@' + data.username
                document.getElementById("form_email").value = data.email
                document.getElementById("form_biography").value = data.bio
                // document.getElementById("form_photoprofile").value = data.photoprofile
                // document.getElementById("NavUsername").innerText = '@' + data.username
               
            });
        }
    };
};

function editAccount () {

    id_person = localStorage.getItem('id')

    username = document.getElementById('form_username').value
    fullname =document.getElementById('form_fullname').value
    email =document.getElementById('form_email').value
    bio =document.getElementById('form_biography').value

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:4125/editprofil");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({
        "id" : id_person,
        "username" : username,
        "fullname" : fullname,
        "email" : email,
        "bio" : bio
    }));

    xmlHttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            alert('Account Success Edited');
            document.location="editprofile.html"
        }
    };
};

function editPassword(){

    id_person = localStorage.getItem('id')

    currentpassword = document.getElementById('form_currentpassword').value
    newpassword = document.getElementById('form_newpassword').value
    verifypassword =document.getElementById('verifypassword').value

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:4125/editpassword");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.send(JSON.stringify({

        "id" : id_person,
        "curr_pass" : currentpassword,
        "new_pass" : newpassword,
        "ver_pass" : verifypassword
    }));

    xmlHttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            alert('Password Success Change')
            document.location = "editpassword.html"
        }
    }
}