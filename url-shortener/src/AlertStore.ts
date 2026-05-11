
import { defineStore } from "pinia";
import { ref } from "vue";

type AlertData = {
    text: string,
    type: string,
    persistent?: boolean
}

const useAlertStore = defineStore("alert", () => {
	const isActive = ref(false);
    const alerts = ref<AlertData[]>([]);
    const currentAlert = ref<AlertData | null>(null);
    const ALERT_DURATION = 2500;


    function alert(alertData: AlertData | null) {
        if (isActive.value === true) {
            if (alertData !== null) {
                alerts.value.push(alertData)

            }
        } else {
            const data = alerts.value.shift()
            if (data === undefined) {
                if (alertData !== null) {
                    currentAlert.value = alertData
                    
                } else {
                    
                    return;
                }
            } else {
                currentAlert.value = data
            
            }
            isActive.value = true
            
            if(!currentAlert.value?.persistent) {
                setTimeout(() => {
                    isActive.value = false
                    alert(null)
                }, ALERT_DURATION);
            }
        }
    }
    
    function dismiss(){
        isActive.value = false;
        setTimeout(() => {
            alert(null)
        }, 200);
    }

	return { isActive, alert, currentAlert, dismiss };
})

export default useAlertStore;