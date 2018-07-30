var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index', {title: 'Computer not working?'});
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.post('/contact/send', (req, res) => {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'beckwithdylan@gmail.com',
			pass: 'Green Dragon 8'
		}
	});

	var mailOptions = {
		from: 'Dylan Beckwith <beckwithdylan@gmail.com>',
		to: 'dylan@wintermute.industries',
		subject: 'Website Submission',
		text: 'You have a submission with the following details...\nName: ' +req.body.name+ '\nEmail: ' +req.body.email+ '\nMessage: ' +req.body.message,
		//html: '<p>You have a submission with the following details...</p><ul><li>' +req.body.name+'</li><li>'+req.body.email+'</li><li>'+req.body.message+'</li></ul>'
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message sent: '+ info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('Server is running on port 3000');