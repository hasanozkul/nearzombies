import { ref, getDatabase, get, child } from "firebase/database";

export async function getChapterData(langInfo:any, courseInfo:any ,chapterInfo:any) {
    
    let chapterData: { id: string }[] = []

    const dbRef = ref(getDatabase());
    await get(child(dbRef, 'courses/' + langInfo + '/' + courseInfo + '/' + chapterInfo + '/')).then((snapshot) => {
        if (snapshot.exists()) {
        const dict = snapshot.val()
        for (var key in dict){
          const user_ID_pair = Object.assign(dict[key],{id:key})
          chapterData.push(user_ID_pair)
        }
        console.log(chapterData);
  
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return {
        props: {
          chapterData
        }
    }
}