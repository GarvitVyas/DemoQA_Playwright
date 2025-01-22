const data={
    'full-name':'Garvit Vyas',
    'email':'garvitxyz21@gmail.com',
    'wrong-email':'garvitvyas@',
    'current-address':'near Jawar Nagar, T/2',
    'permanent-address':'near Jawar Nagar, T/2',
    'Home-Text':'Home',
    'webtablePage':'webtables',
    'radiobuttonPage':'radio-button',
    'email-valid':/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const staticUser={
    'First Name':'Alden',
    'last Name' : 'Cantrell',
    'Age' : '45',
    'Email' : 'alden@example.com',
    'Salary' : '12000',
    'Department':'Compliance'
}

data['permanent-address']=data['current-address'];

export{data, staticUser};