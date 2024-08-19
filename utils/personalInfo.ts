export const PersonalInfo = {
    name:'Pranav Sunil',
    tag:'Software Developer',
    descriptiveTag:'Computer Engineering (Final Year) | AI ML Engineer @PenPixelLLP',
    profilePic:'/profile.jpg',
    email1:'pypranv.sunil@gmail.com',
    email2:'pranavsunil2103@gmail.com',
    phoneNo:'8928017632',
    website:'www.pypranav.com',
    skills:{
        lanuages:([
            {
                id:1,
                name:'Python',
                level:'Expert',
                icon:'/settings_icon/skills/python.webp'
            },
            {
                id:2,
                name:'JavaScript',
                level:'Expert',
                icon:'/settings_icon/skills/js.webp'
            },
            {
                id:3,
                name:'TypeScript',
                level:'Intermediate',
                icon:'/settings_icon/skills/typescript.webp'
            },
            {
                id:4,
                name:'HTML',
                level:'Intermediate',
                icon:'/settings_icon/skills/html5.webp'
            },
            {
                id:5,
                name:'CSS',
                level:'Beginner',
                icon:'/settings_icon/skills/css3.webp'
            },
        ]) as {id:number,name:string, level:("Expert"|"Intermediate"|"Beginner"),icon:string}[],
        frameworks:([
            {
                id:1,
                name:'Flask',
                level:'Expert',
                icon:'/settings_icon/skills/flask.webp'
            },
            {
                id:2,
                name:'React.js',
                level:'Expert',
                icon:'/settings_icon/skills/react.svg'
            },
            {
                id:3,
                name:'Next.js',
                level:'Intermediate',
                icon:'/settings_icon/skills/next.svg'
            },
            {
                id:4,
                name:'Django',
                level:'Intermediate',
                icon:'/settings_icon/skills/django.webp'
            },
            {
                id:5,
                name:'Tensorflow',
                level:'Intermediate',
                icon:'/settings_icon/skills/tensorflow.webp'
            },
            
            {
                id:6,
                name:'PyTorch',
                level:'Intermediate',
                icon:'/settings_icon/skills/torch.webp'
            },
            {
                id:7,
                name:'Express.js',
                level:'Beginner',
                icon:'/settings_icon/skills/express.webp'
            },
           
        ]) as {id:number,name:string, level:("Expert"|"Intermediate"|"Beginner") ,icon:string}[]
    },
    experience:[
        {
            id:1,
            position:'AI ML Engineer',
            companyName:'Penpixel LLP',
            duration:'Jun 2024 - Present',
            icon:'/settings_icon/experience/penpixel.jpeg'
        },
        {
            id:2,
            position:'Technical Secretary',
            companyName:'Pillai College of Engineering',
            duration:'Sep 2023 - Aug 2024 · 1 yr',
            icon:'/settings_icon/experience/pce.webp'
        },
        {
            id:3,
            position:'Technical Head',
            companyName:'Alegria - The Festival of Joy',
            duration:'Dec 2023 - Mar 2024 · 4 mos',
            icon:'/settings_icon/experience/alg.webp'
        },
        {
            id:4,
            position:'Junior Software Engineer',
            companyName:'Daynt',
            duration:'Dec 2022 - Oct 2023 · 11 mos',
            icon:'/settings_icon/experience/daynt.webp'
        },
        {
            id:5,
            position:'Technical Team Member',
            companyName:'Google Developer Student Clubs PCE',
            duration:'Sep 2022 - Aug 2023 · 1 yr',
            icon:'/settings_icon/experience/gdsc.webp'
        }
    ],
    education:[
        {
            id:1,
            institute:'Pillai College Of Engineering',
            course:'Bachelor of Technology - BTech, Computer Science',
            duration:'2021 - 2025',
            icon:'/settings_icon/experience/pce.webp'
        },
        {
            id:2,
            institute:'New Horizon Public School',
            course:'CBSE 11th - 12th',
            duration:'2019 - 2020',
            icon:'/settings_icon/experience/nhps.webp'
        },
        {
            id:3,
            institute:'New Horizon Public School',
            course:'CBSE 1st - 10th',
            duration:'2008 - 2018',
            icon:'/settings_icon/experience/nhps.webp'
        },
    ]
}