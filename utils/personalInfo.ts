export const PersonalInfo = {
    name:'Pranav Sunil',
    tag:'Software Developer',
    descriptiveTag:'Computer Engineering (Final Year) | AI ML Engineer @PenPixelLLP',
    profilePic:'/profile.jpg',
    email1:'pypranv.sunil@gmail.com',
    email2:'pranavsunil2103@gmail.com',
    phoneNo:'8928017632',
    website:'www.pypranav.com',
    cover:'/cover.jpg',
    location:'Raigad, Maharashtra, India',
    description:`
    I'm a final-year Computer Engineering student with a passion for AI, ML, and web development, currently honing my skills as an AI ML Engineer at PenPixel LLP. With hands-on experience in Next.js, Flask, and Python, I enjoy creating dynamic, scalable applications that solve real-world problems. My journey in tech is driven by curiosity and a commitment to continuous learning, and I've been fortunate to contribute to impactful projects, from developing virtual assistants to excelling in national hackathons. I'm excited to collaborate on innovative projects that push the boundaries of technology.
    `,
    skills:{
        lanuages:([
            {
                name:'Python',
                level:'Expert',
                icon:'/settings_icon/skills/python.webp'
            },
            {
                name:'JavaScript',
                level:'Expert',
                icon:'/settings_icon/skills/js.webp'
            },
            {
                name:'TypeScript',
                level:'Intermediate',
                icon:'/settings_icon/skills/typescript.webp'
            },
            {
                name:'HTML',
                level:'Intermediate',
                icon:'/settings_icon/skills/html5.webp'
            },
            {
                name:'CSS',
                level:'Beginner',
                icon:'/settings_icon/skills/css3.webp'
            },
        ]) as {name:string, level:("Expert"|"Intermediate"|"Beginner"),icon:string}[],
        frameworks:([
            {
                name:'Flask',
                level:'Expert',
                icon:'/settings_icon/skills/flask.webp'
            },
            {
                name:'React.js',
                level:'Expert',
                icon:'/settings_icon/skills/react.svg'
            },
            {
                name:'Next.js',
                level:'Intermediate',
                icon:'/settings_icon/skills/next.svg'
            },
            {
                name:'Django',
                level:'Intermediate',
                icon:'/settings_icon/skills/django.webp'
            },
            {
                name:'Tensorflow',
                level:'Intermediate',
                icon:'/settings_icon/skills/tensorflow.webp'
            },
            
            {
                name:'PyTorch',
                level:'Intermediate',
                icon:'/settings_icon/skills/torch.webp'
            },
            {
                name:'Express.js',
                level:'Beginner',
                icon:'/settings_icon/skills/express.webp'
            },
           
        ]) as {name:string, level:("Expert"|"Intermediate"|"Beginner") ,icon:string}[]
    },
    experience:[
        {
            position:'AI ML Engineer',
            companyName:'Penpixel LLP',
            duration:'Jun 2024 - Present',
            icon:'/settings_icon/experience/penpixel.jpeg',
            loc:'Thane, Maharashtra, India'
        },
        {
            position:'Technical Secretary',
            companyName:'Pillai College of Engineering',
            duration:'Sep 2023 - Aug 2024 · 1 yr',
            icon:'/settings_icon/experience/pce.webp',
            loc:'Navi Mumbai, Maharashtra, India'
        },
        {
            position:'Technical Head',
            companyName:'Alegria - The Festival of Joy',
            duration:'Dec 2023 - Mar 2024 · 4 mos',
            icon:'/settings_icon/experience/alg.webp',
            loc:'Navi Mumbai, Maharashtra, India'
        },
        {
            position:'Junior Software Engineer',
            companyName:'Daynt',
            duration:'Dec 2022 - Oct 2023 · 11 mos',
            icon:'/settings_icon/experience/daynt.webp',
            loc:'Navi Mumbai, Maharashtra, India'
        },
        {
            position:'Technical Team Member',
            companyName:'Google Developer Student Clubs PCE',
            duration:'Sep 2022 - Aug 2023 · 1 yr',
            icon:'/settings_icon/experience/gdsc.webp',
            loc:'Panvel, Maharashtra, India'
        }
    ],
    education:[
        {
            institute:'Pillai College Of Engineering',
            course:'Bachelor of Technology - BTech, Computer Science',
            duration:'2021 - 2025',
            icon:'/settings_icon/experience/pce.webp'
        },
        {
            institute:'New Horizon Public School',
            course:'CBSE 11th - 12th',
            duration:'2019 - 2020',
            icon:'/settings_icon/experience/nhps.webp'
        },
        {
            institute:'New Horizon Public School',
            course:'CBSE 1st - 10th',
            duration:'2008 - 2018',
            icon:'/settings_icon/experience/nhps.webp'
        },
    ],
    instaPosts:[
        '/arc/insta/post1.jpg',
        '/arc/insta/post2.jpg',
        '/arc/insta/post3.jpg',
        '/arc/insta/post4.jpg',
        '/arc/insta/post5.jpg',
    ],
    gihubAchivements:[
        '/arc/github/achievement1.png',
        '/arc/github/achievement2.png',
        '/arc/github/achievement3.png',
        '/arc/github/achievement4.png',
        '/arc/github/achievement5.png',
    ],
    hostedProjects:[
        {
            name:'Tower of Hanoi',
            url:'https://pypranav.github.io/Tower_of_Hanoi/',
            icon:'/arc/others/toh.png'
        },
        {
            name:'Envision',
            url:'https://datavisual.pythonanywhere.com/home/',
            icon:'/arc/others/envision.png'
        }
    ]
}