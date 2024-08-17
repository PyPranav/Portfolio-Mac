export const PersonalInfo = {
    name:'Pranav Sunil',
    tag:'Software Developer',
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
            }
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
                name:'Express.js',
                level:'Beginner',
                icon:'/settings_icon/skills/express.webp'
            },
           
        ]) as {id:number,name:string, level:("Expert"|"Intermediate"|"Beginner") ,icon:string}[]
    }
}