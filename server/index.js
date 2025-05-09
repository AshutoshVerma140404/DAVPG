// Requiring module
const express = require('express');
var connection = require('./db');
const multer = require("multer")
const path = require('path');
const axios = require('axios');

const fs = require('fs');
const cors=require("cors");
const session = require('express-session'); 
const mysqlStore = require('express-mysql-session')(session);
require('dotenv').config();
const options ={ 
 host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port:     process.env.DB_PORT,
  createDatabaseTable: true
}
const TWO_HOURS = 1000 * 60 * 60 * 2
const  sessionStore = new mysqlStore(options);

const app = express();
app.use(cors({
  origin: "http://localhost:3000",  // or whatever your React app’s URL is
  credentials: true
}));

app.use(session({
  name: 'test',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  secret: process.env.SECRET,  
  cookie: {
      httpOnly: true,
      maxAge: TWO_HOURS,
      sameSite: true,
      secure: false
  }
}))
app.use(express.json());
app.options('*', cors());
app.use(express.static('public'));
var bodyParser=require("body-parser"); 
const con = require('./db');
app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname, 'views'))
app.set("view engine", "ejs"); 

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const { isStringObject } = require('util/types');
const { title, send } = require('process');
const { error } = require('console');
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());



//dummy faculty json data
let props = {
  name: 'Dr. Rohit Kumar Tiwari',
  photo: 'http://www.mmmut.ac.in/News_content/IMGFaculty198.jpg',
  resume: 'https://www.davpgcollege.in/docs/Dr_Rajesh_Kumar.pdf',
  designation: 'Assistant Professor',
  phone: '1234567890',
  email: 'abs@gmail.com',
  department: 'Department of Computer Science',
  area_of_interest: 'Machine Learning, Data Science, Artificial Intelligence',
  highest_qualification: 'Ph.D.',
  teaching_experience: '10 years',
  publications_books_patents: '10',
  seminar_conference_workshop_organized: '20',
  seminar_conference_workshop_attended: '20',
  fellowship_awards: 'ministry of science and technology',
  membership: 'IEEE, ACM',
  masters_supervised: '10',
  phd_supervised: '5',
  other_info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum aliquam lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum aliquam.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum aliquam.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum aliquam.'
};
const experiences =[
  {
    from: '2010',
    to: '2015',
    position: 'Assistant Professor',
    organization: 'XYZ College'
  },
  {
    from: '2015',
    to: '2020',
    position: 'Associate Professor',
    organization: 'ABC College ' 
  },
  {
    from: '2020',
    to: 'Present',
    position: 'Professor',
    organization: 'DAVPG College'
  }
];
const awards =[
  {
    title: 'Best Faculty Award',
    year: '2015',
    organization: 'XYZ College'
  },
  {
    title: 'Best Faculty Award',
    year: '2016',
    organization: 'ABC College'
  },
  {
    title: 'Best Faculty Award',
    year: '2017',
    organization: 'DAVPG College'
  }
];
const qualifications =[{
  degree: 'Ph.D.',
  specialisation: 'Machine Learning',
  institute: 'IIT Kanpur',
  year: '2015'
  },
  {
    degree: 'M.Tech',
    specialisation: 'Data Science',
    institute: 'IIT Kanpur',
    year: '2010'
  },
  {
    degree: 'B.Tech',
    specialisation: 'Computer Science',
    institute: 'IIT Kanpur',
    year: '2008'
  }
];
const publications=[
  {
    title: 'Machine Learning',
    dept: 'Computer Science',
    category: 'Journal',
    year: '2015',
    month: '5',
    indexing: 'SCI',
    issn: '123456',
    impact: '5.6'
  },
  {
    title: 'Data Science',
    dept: 'Computer Science',
    category: 'Journal',
    year: '2016',
    month: '6',
    indexing: 'SCI',
    issn: '123456',
    impact: '5.6'
  },{
    title: 'Artificial Intelligence',
    dept: 'Computer Science',
    category: 'Journal',
    year: '2017',
    month: '7',
    indexing: 'SCI',
    issn: '123456',
    impact: '5.6'
  }
];



//function for fetching header marquee data
let header_marquee_data = undefined;
function fetchMarqueeDetails(callback) {
  const query = 'SELECT * FROM railway.news_events_marquee ORDER BY ID DESC;';
  connection.query(query, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
fetchMarqueeDetails((error, results) => {
  if (error) {
    console.error('Error fetching marquee details:', error);
  } else {
    header_marquee_data = results;
  }
});


// Handling GET request
app.get('/', (req, res) => {
      //res.render('index',{send : header_marquee_data, header_marquee_data});
      res.json({ header_marquee_data });
});

app.get('/health-check-polling', (req, res) => {
  res.status(200).send('OK');
});


const IsAdmin = (req, res, next) => {
  if (req.session.IsAdmin) {
    return next();
  }
  console.warn('Unauthorized admin access attempt:', req.originalUrl);
  return res.status(403).json({
    error: {
      code: 403,
      message: 'Forbidden: Admins only'
    }
  });
};

const IsAuth = (req, res, next) => {
  if (req.session.IsAuth) {
    return next();
  }
  console.warn('Unauthorized access attempt:', req.originalUrl);
  return res.status(401).json({
    error: {
      code: 401,
      message: 'Unauthorized: Please log in'
    }
  });
};

 
app.get('/facutly_profile/:id',(req,res)=>{
  // USERNAME WILL BE FETCHED FROM FROM CALLING FUNCTION
  var username = req.params.id;
  //var username = "test1@mmmut.ac.in"
  const sqlQueries = [
    'SELECT * FROM railway.faculty WHERE Id="'+username+'";',
    'SELECT * FROM railway.profession_career WHERE email="'+username+'";',
    'SELECT * FROM railway.award WHERE email="'+username+'";',
    'SELECT * FROM railway.educational_qualification WHERE email="'+username+'";',
    'SELECT * FROM railway.publication WHERE email="'+username+'";'
  ];

  Promise.all(sqlQueries.map(query => executeQuery(query)))
  .then((results) => {
    const [facultyDetails, experiences, awards, qualifications, publications] = results;
   // res.render('faculty_profile', { results: facultyDetails, experiences, awards, qualifications, publications, header_marquee_data });
    res.json({results: facultyDetails, experiences, awards, qualifications, publications, header_marquee_data});
  }).catch((error) => {
      console.error('Error fetching faculty profile details:', error);
      res.status(500).send('Error fetching faculty profile details');
  });
});
 
function executeQuery(sqlQuery) {
  return new Promise((resolve, reject) => {
      connection.query(sqlQuery, (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      });
  });
}

app.get('/login', (req, res) => {
       // res.render('login',{message:false,header_marquee_data,error:false});
       res.json({message:false,header_marquee_data,error:false});
});
app.get('/ba', (req, res) => {
 // res.render('ba',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/ma', (req, res) => {
  //res.render('ma',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/gbody', (req, res) => {
 // res.render('gbody',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/syllabus', (req, res) => {
  //res.render('syllabus',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/launch', (req, res) => {
  //res.render('launch',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/timetable', (req, res) => {
  //res.render('timetable',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/alumniassoc', (req, res) => {
  //res.render('alumniassoc',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/bsc', (req, res) => {
  //res.render('bsc',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/bcom', (req, res) => {
  //res.render('bcom',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/bca', (req, res) => {
  //res.render('bca',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/p_message', (req, res) => {
  //res.render('p_message',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/vission', (req, res) => {
 // res.render('vission',{header_marquee_data});  
 res.status(200).json({header_marquee_data});
});
app.get('/history', (req, res) => {  
  //res.render('history',{header_marquee_data}); 
  res.status(200).json({header_marquee_data});
});
app.get('/practorial', (req, res) => {
 // res.render('practorial',{header_marquee_data});
 res.status(200).json({header_marquee_data});
});
app.get('/alumnireg', (req, res) => {
  //res.render('alumnireg',{error:false,header_marquee_data});
  res.status(200).json({error:false, header_marquee_data});
});
app.get('/grievance', (req, res) => {
 // res.render('grievance',{header_marquee_data});
 res.status(200).json({header_marquee_data});
});
app.get('/research', (req, res) => {
  //res.render('research',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/literary', (req, res) => {
 // res.render('literary',{header_marquee_data});
 res.status(200).json({header_marquee_data});
});
app.get('/career', (req, res) => {
  //res.render('career',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/sexual', (req, res) => {
  //res.render('sexual',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/c_corner', (req, res) => {
  //res.render('c_corner',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/admission', (req, res) => {
 // res.render('admission',{header_marquee_data});
 res.status(200).json({header_marquee_data});
});
app.get('/contact', (req, res) => {
  //res.render('contact',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.get('/code_of_conduct', (req, res) => {
 // res.render('code_of_conduct',{header_marquee_data});
 res.status(200).json({header_marquee_data});
});
app.get('/m_message', (req, res) => {
  //res.render('m_message',{header_marquee_data});
  res.status(200).json({header_marquee_data});
});
app.post('/login_auth', (req,res)=>{
  var username=req.body.uname;
  var pass = req.body.psw;
if(!username || !pass){
    res.status(403).json({
        message: 'Please enter username and password'
        });
}

  var sql='SELECT * FROM railway.user WHERE Id="'+username+'";';
  var sql2 = 'SELECT * FROM railway.faculty WHERE Id="'+username+'";';
  console.log(sql);
    console.log(sql2);
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      if(data.length<0 || data[0]["Pass"]!=pass){
       // res.render('login',{message:true,error:{status: 403,stack: 'Invalid Username or Password'}});
       res.status(403).json({
          message: 'Invalid Username or Password'
        });
      }

      else{
        if(data[0]["UserType"]=="admin"){
          req.session.IsAuth = true;
          req.session.IsAdmin = true;
          req.session.username = data[0]["Id"];
          //pending to modfiy for react 
         // res.render('admin_dashboard');
          res.status(200).json({
            userType: "admin",
            username: username,
            message: "Login successful"
          });
        }
        else if(data[0]["UserType"]=="faculty"){
          connection.query(sql2, function (err2, data2) {
            if (err2){
              throw err2;
            } 
            else{
              req.session.IsAuth = true;
              req.session.username = data[0]["Id"];
               //pending to modfiy for react 
              //res.render('faculty_dashboard',{results : data2,username, status: 200});
              res.status(200).json({results : data2,username});
            }
          });
        }
      }
    }
  });
});
app.get('/viewNews', IsAdmin, (req, res) => {
  var sql = 'SELECT * FROM railway.news_events_marquee ORDER BY Type, ID DESC;';
  connection.query(sql, function (err, data) {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({
      send: data,
      headerMarquee: header_marquee_data || null
    });
  });
});

app.get('/viewallnews', (req, res) => {
  var sql='SELECT * FROM railway.news_events_marquee WHERE Type="News" ORDER BY ID DESC;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      //res.render('viewallnews',{send:data,header_marquee_data});
      res.status(200).json({send:data,header_marquee_data});
    }
  });
});
app.get('/viewallevent', (req, res) => {
  var sql='SELECT * FROM railway.news_events_marquee WHERE Type="Events" ORDER BY ID DESC;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      //res.render('viewallevent',{send:data,header_marquee_data});
      res.status(200).json({send:data,header_marquee_data});
    }
  });
});
app.get('/viewalumni',IsAdmin,(req, res) => {
  var sql='SELECT * FROM railway.alumni;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
     // res.render('viewalumni',{send:data,header_marquee_data});
     res.status(200).json({send:data,header_marquee_data});
    }
  });
});

app.get('/faculty_experience_instance',IsAuth, (req, res) => {
  
  //res.render('partials/faculty_experience_instance');
  
});
app.get('/faculty_experience_upload',IsAuth, (req, res) => {
  //res.render('partials/faculty_experience_upload');
});
app.get('/faculty_awards_instance',IsAuth, (req, res) => {
  //res.render('partials/faculty_awards_instance');
});
app.get('/faculty_awards_upload',IsAuth, (req, res) => {
  //res.render('partials/faculty_awards_upload');
});
app.get('/faculty_qualifications_instance',IsAuth, (req, res) => {
  //res.render('partials/faculty_qualifications_instance');
});
app.get('/faculty_qualifications_upload',IsAuth, (req, res) => {
  //res.render('partials/faculty_qualifications_upload');
});
app.get('/faculty_publications_instance',IsAuth, (req, res) => {
  //res.render('partials/faculty_publications_instance');
});
app.get('/faculty_publications_upload',IsAuth, (req, res) => {
  //res.render('partials/faculty_publications_upload');
});
app.get('/facultylist', IsAdmin, (req, res) => {
  var sql='SELECT * FROM railway.faculty order by Department, Designation DESC;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      // res.render('facultylist',{send:data,header_marquee_data});
      res.status(200).json({send:data,header_marquee_data});
    }
  });
});
app.get('/delete_faculty/:id', IsAdmin,(req, res) => {
  var Id= req.params.id;
  var sql="DELETE FROM railway.faculty WHERE Id='"+Id+"'";
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      res.redirect(302,'/facultylist'); 
    }
  });
});
app.get('/uploadNews', IsAdmin, (req, res) => {
  //res.render('uploadNews',{header_marquee_data});
  res.status(200).json({send:data,header_marquee_data});
});
app.get('/nonteaching', (req, res) => {
  //res.render('nonteaching',{header_marquee_data});
  res.status(200).json({send:data,header_marquee_data});
});

app.get('/update_faculty_experience', IsAuth, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM railway.profession_career WHERE email="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
     // res.render('update_faculty_experience',{experiences:data,username});
     res.status(200).json({experiences:data,username});
    }
  });
});

app.get('/update_faculty_awards', IsAuth, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM railway.award WHERE email="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
     // res.render('update_faculty_awards',{awards:data,username});
     res.status(200).json({awards:data,username});
      
    }
  });
});
app.get('/update_faculty_qualifications', IsAuth, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM railway.educational_qualification WHERE email="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
     // res.render('update_faculty_qualifications',{qualifications:data,username});
     res.status(200).json({qualifications:data,username});
    }
  });
});
app.get('/update_faculty_publications', IsAuth, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM railway.publication WHERE email="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
      //res.render('update_faculty_publications',{publications:data,username});
      res.status(200).json({publications:data,username});
    }
  });
});
app.get('/faculty_dashboard', IsAuth, (req, res) => {
  const username = req.session.username;
  var sql2 = 'SELECT * FROM railway.faculty WHERE Id="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      throw err;
    } 
    else{
     //res.render('faculty_dashboard',{results : data,username,status: 202});
     res.status(202).json({result:data,username});
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/docs');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'application/pdf' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' || file.mimetype=='image/png' ) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
app.post('/uploadnews', upload.single('myfile'), (req, res, next) => {
  try {
        var type=req.body.type;
        var title = req.body.title;
        var fname;
        if(req.file)
          fname = req.file.filename;
        else
          fname='';
        var sql= 'INSERT INTO railway.news_events_marquee (Title , Type , Link) VALUES (?,?,?);';
        connection.query(sql, [title,type,fname],function (err, data) {
          if (err){
            console.log(err);
          } 
          else{
          //  res.redirect(302, '/viewNews');
          res.status(200).json({    
            message: "File uploaded successfully",
          });
           // res.status(302);
            }
        });
  } catch (error) {
      console.error(error);
  }
});

// allow missing file segment
app.get('/delete_news/:id/:file?', IsAdmin, (req, res) => {
  const Id = req.params.id;
  console.log("herr", Id);
  const sql = 'DELETE FROM railway.news_events_marquee WHERE Id=' + Id;
  console.log(sql);
  connection.query(sql, (err, data) => {
    if (err) throw err;
    // Clean up the file if one was passed
    if (req.params.file) {
      const deleteFile = './public/docs/' + req.params.file;
      if (fs.existsSync(deleteFile)) {
        fs.unlink(deleteFile, err => { if (err) console.log(err); });
      }
    }
    res.status(200).json({ message: "Deleted successfully" });
  });
});

app.post('/reg_sub', upload.single('photo') , (req, res, next)=>{
  try{  
    console.log(req.file);
    var name_f=req.body.name;
    var father = req.body.father;
    var mother = req.body.mother;
    var email=req.body.email;
    var MoNo = req.body.MoNo;
    var dob = req.body.dob;
    var Address=req.body.Address;
    var gender = req.body.gender;
    var degree = req.body.degree;
    var year=req.body.year;
    var designation = req.body.designation;
    var workingplace = req.body.workingplace;
    var specialization = req.body.specialization;
    var fname = req.file.filename;
    var sql= 'INSERT INTO railway.alumni (Name,Father,Mother,Dob,Address,Gender,Email,Mobile,Photo,Degree,YearofPassing,Designation,WorkingAddress,Specialization) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);';    
        connection.query(sql, [name_f,father,mother,dob,Address,gender,email,MoNo,fname,degree,year,designation,workingplace,specialization],function (err, data) {
          if (err){
            throw err;
          } 
          else{
            res.redirect(302,'/alumnireg');
            res.status(302);
            }
    });
  }catch (error) {
    console.error(error);
  }
});

app.post('/update_faculty_details', upload.fields([{name:'photo',maxCount:1},{name:'resume',maxCount:1}]), (req, res, next)=>{
  try{  
    console.log(req.file);
    var {name, email, phone ,department, designation, highest_qualification, area_of_interest, teaching_experience, publications_books_patents, seminar_conference_workshop_organized,seminar_conference_workshop_attended , fellowship_awards, membership, masters_supervised, phd_supervised, other_info} = req.body;

    const newPhoto = req.files['photo'] ? req.files['photo'][0] : null;
    const newResume = req.files['resume'] ? req.files['resume'][0] : null;
    if(newPhoto){
      imageFile = newPhoto.filename;
      connection.query('update railway.faculty set photo = ? where Id = ?',[imageFile,email],(err,data)=>{
        if(err) throw err;
        else console.log('Image updated');
      });
    }
    if(newResume){
      resumeFile = newResume.filename;
      connection.query('update railway.faculty set resume = ? where Id = ?',[resumeFile,email],(err,data)=>{
        if(err) throw err;
        else console.log('Resume updated');
      });
    }
    
    var sql= 'UPDATE railway.faculty SET phone=?, area_of_interest=?,highest_qualification=?, teaching_experience=?, publications_books_patents=?, seminar_conference_workshop_organized=?,seminar_conference_workshop_attended=? , fellowship_awards=?, membership=?, masters_supervised=?, phd_supervised=?, other_info=? WHERE Id = ?;';  
    connection.query(sql, [phone, area_of_interest,highest_qualification, teaching_experience, publications_books_patents, seminar_conference_workshop_organized,seminar_conference_workshop_attended , fellowship_awards, membership, masters_supervised, phd_supervised, other_info,email],function (err, data) {
      if (err){
        throw err;
      } 
      else{
        res.redirect('/faculty_dashboard');
      }
    });
  }catch (error) {
    console.error(error);
  }
});
app.post('/update_faculty_experience', (req, res, next) => {
  console.log(req.body);
  const { designation, _from, _to, organization } = req.body;
  const email = req.session.username;

  const sql = 'INSERT INTO railway.profession_career (email, _from, _to, position,organization) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [email, _from, _to, designation, organization], function (err, data) {
    if (err) {
      console.error('Error inserting faculty experience:', err);
     // return res.status(500).send('Error updating faculty experience');
    return res.status(500).json({message :  "Error updating faculty experience"});
    } 
    console.log('Faculty experience updated successfully');
   // res.redirect('/update_faculty_experience');
    res.status(200).json({message: "Faculty experience updated successfully"});
  });
});

app.post('/update_faculty_award', (req, res, next) => {
  console.log(req.body);
  const { title,year, organization } = req.body;
  const email = req.session.username;

  const sql = 'INSERT INTO railway.award (email,award , year,awarding_organization) VALUES (?, ?, ?, ?)';
  connection.query(sql, [email, title, year, organization], function (err, data) {
    if (err) {
      console.error('Error inserting faculty award:', err);
      // return res.status(500).send('Error updating faculty award');
      return res.status(500).json({message :  "Error updating faculty awards"});
    } 
    console.log('Faculty award updated successfully');
    //res.redirect('/update_faculty_awards');
    res.status(200);
  });
});

app.post('/update_faculty_qualification', (req, res, next) => {
  console.log(req.body);
  const { degree, specialisation, institute, year} = req.body;
  const email = req.session.username;

  const sql = 'INSERT INTO railway.educational_qualification (email,degree ,specialization, institute, year) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [email, degree, specialisation,institute, year], function (err, data) {
    if (err) {
      console.error('Error inserting faculty qualification:', err);
      // return res.status(500).send('Error updating faculty qualification');
      return res.status(500).json({message :  "Error updating faculty qualification"});
    } 
    console.log('Faculty qualification updated successfully');
   // res.redirect('/update_faculty_qualifications');
   res.status(200);
  });
});

app.post('/update_faculty_publication', (req, res, next) => {
  console.log(req.body);
  const { publication ,department , category, year, month, indexing, issn , impact} = req.body;
  const email = req.session.username;

  const sql = 'INSERT INTO railway.publication (email,publication ,department , category, year, month, indexing, issnno , impactfactor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [email,publication ,department , category, year, month, indexing, issn , impact], function (err, data) {
    if (err) {
      console.error('Error inserting faculty publication:', err);
      // return res.status(500).send('Error updating faculty publication');
      return res.status(500).json({message :  "Error updating faculty publication "});
    } 
    console.log('Faculty publication updated successfully');
   // res.redirect('/update_faculty_publications');
   res.status(200);
  });
});

app.post('/delete_faculty_experience/:experienceId', (req, res) => {
  // Extract the experienceId from URL parameters
  const experienceId = req.params.experienceId;

  // Execute a DELETE query in the database
  const sql = 'DELETE FROM railway.profession_career WHERE id = ?';
  connection.query(sql, [experienceId], function (err, result) {
      if (err) {
          console.error('Error deleting experience:', err);
          // return res.status(500).send('Error deleting experience');
          return res.status(500).json({message :  "Error deleting experience"});
      } 
      console.log('Experience deleted successfully');
      //res.redirect('/update_faculty_experience');
      res.status(200);
  });
});
app.post('/delete_faculty_award/:awardId', (req, res) => {
  // Extract the awardId from URL parameters
  const awardId = req.params.awardId;

  // Execute a DELETE query in the database
  const sql = 'DELETE FROM railway.award WHERE id = ?';
  connection.query(sql, [awardId], function (err, result) {
      if (err) {
          console.error('Error deleting award:', err);
          //return res.status(500).send('Error deleting award');
          return res.status(500).json({message :  "Error deleting awards"});
      } 
      console.log('Award deleted successfully');
      //res.redirect('/update_faculty_awards');
      res.status(200);
  });
});

app.post('/delete_faculty_qualification/:qualificationId', (req, res) => {
  // Extract the qualificationId from URL parameters
  const qualificationId = req.params.qualificationId;

  // Execute a DELETE query in the database
  const sql = 'DELETE FROM railway.educational_qualification WHERE id = ?';
  connection.query(sql, [qualificationId], function (err, result) {
      if (err) {
          console.error('Error deleting qualification:', err);
          //return res.status(500).send('Error deleting qualification');
          return res.status(500).json({message :  "Error deleting qualification"});
      } 
      console.log('qualification deleted successfully');
      //res.redirect('/update_faculty_qualifications');
      res.status(200);
  });
});

// api to delete faculty publication
app.post('/delete_faculty_publication/:publicationId', (req, res) => {
  const publicationId = req.params.publicationId;

  const sql = 'DELETE FROM railway.publication WHERE id = ?';
  connection.query(sql, [publicationId], function (err, result) {
      if (err) {
          console.error('Error deleting publication:', err);
          //return res.status(500).send('Error deleting publication');
          return res.status(500).json({message :  "Error deleting publication"});
      } 
      console.log('publication deleted successfully');
      //res.redirect('/update_faculty_publications');
      res.status(200);
  });
});

// merged files from anant

// department.ejs file route
app.get('/department', (req, res) => {
 // res.render('department',{send : header_marquee_data, header_marquee_data});
  res.status(200).json({send : header_marquee_data, header_marquee_data});
});

// Define a route to fetch faculty data
app.get('/viewfaculty', (req, res) => {
  const sql = 'SELECT * FROM faculty where Department="Faculty of Arts"';
  connection.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }else{
     // res.render('viewfaculty', { results:data, header_marquee_data});
     res.status(200).json({results: data, header_marquee_data});
    }
  });
});

// Define a route to add faculty data
app.get('/addfaculty', IsAuth, (req, res) => {
  // res.render('addfaculty',{send : header_marquee_data, header_marquee_data});
  res.status(200).json({send : header_marquee_data, header_marquee_data});
});

app.post('/addfaculty', upload.none(), (req, res) => {
  const { name, email, psw, dept, designation, userType } = req.body;

  if (!email || !psw || !userType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertUserQuery = 'INSERT INTO railway.user (Id, Pass, UserType) VALUES (?, ?, ?)';
  connection.query(insertUserQuery, [email, psw, userType], (err) => {
    if (err) {
      console.error('Error inserting user data:', err);
      return res.status(500).json({ error: 'An error occurred while registering faculty.' });
    }

    const insertFacultyQuery = 'INSERT INTO railway.faculty (Id, Name, Department, Designation) VALUES (?, ?, ?, ?)';
    connection.query(insertFacultyQuery, [email, name, dept, designation], (err) => {
      if (err) {
        console.error('Error inserting faculty data:', err);
        return res.status(500).json({ error: 'An error occurred while saving faculty data.' });
      }

      return res.status(200).json({ message: 'Faculty added successfully' });
    });
  });
});
















app.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
   // res.redirect("/login");
   res.status(200);
  });
});

const PORT = process.env.PORT ||8000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));