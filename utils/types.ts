interface finderType{
    tabValue:string;
    forwardStack: string[];
    openedDoc: null|string;
}

interface personalGptType{
    chats: {role:string, content:string}[]
}

interface arcType{
    tabValue:string;
}

interface settingsType{
    tabValue:string;
    wifi:boolean;
    bluetooth: boolean;
    bg: string;
    bgChanged: boolean;
}

interface photosType{
    photosLoaded:boolean;
    albumOpened:null|'personal'|'projects'|'certificates';
    photoOpened:null|number;
    currentPersonalPhotoIndex:number;
    currentCertificatesPhotoIndex:number;
    currentProjectPhotoIndex:number;
}

interface spotifyType{}

interface gameType{}

interface contactMeType{}


interface appStateType {
    1: finderType;
    2: personalGptType;
    3: arcType;
    4: settingsType;
    5: photosType;
    6: spotifyType; // If you know the structure, define it instead of using `unknown`
    7: gameType;
    8: contactMeType;
}

type AppStateKey = keyof appStateType;