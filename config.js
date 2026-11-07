/* Live shop deliberately disconnected. Never put passwords or private keys here. */
window.POS_CONFIG={enabled:false,mode:'preview',root:'livePos/test',ownerUid:'SET_OWNER_UID',firebase:{apiKey:'SET_FIREBASE_WEB_API_KEY',authDomain:'SET_PROJECT.firebaseapp.com',projectId:'SET_PROJECT',appId:'SET_FIREBASE_WEB_APP_ID'}};

// Owner-only integration check while public test billing is held. Server rules reject other identities.
if(new URLSearchParams(location.search).get('admin-test')==='1')window.POS_CONFIG={enabled:true,mode:'live',testOnly:true,root:'livePos/test',ownerUid:'77PHL79szXWqP5VaD8X1YovPujp2',firebase:{apiKey:'AIzaSyDtplfGP-AmlVzSzu5Lzxjztnc6MB34Fq4',authDomain:'shree-festival-pos.firebaseapp.com',projectId:'shree-festival-pos',appId:'1:552632077785:web:68453eff10fff605401dc8'}};
