import  axiosProxy from './axiosProxy';
import CommonController from "../utils/common/common";
const { axiosInstance } = axiosProxy;
const createSamples = async function (taskId : number,data : any){
    // try {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples`,
        method : 'POST',
        data
    });
    return res;
    // }catch (e) {
    //     CommonController.notificationErrorMessage(e, 5);
    // }
}

const getTask = async function(taskId : number){
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}`,
        method : 'GET',
    });
    return res;
}

const getSamples = async function (taskId : number, params : any) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples`,
        method : 'GET',
        params
    });
    return res;
}

const getPrevSamples = async function (taskId : number, params : any) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples`,
        method : 'GET',
        params
    });
    return res;
}


const getSample = async function (taskId : number, sampleId : number) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples/${sampleId}`,
        method : 'GET'
    });
    return res;
}

const updateSampleState = async function (taskId : number, sampleId : number) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples/${sampleId}`,
        method : 'PATCH',
        params : {
          sample_id : sampleId
        },
        data : {
            state : "SKIPPED"
        }
    });
    return res;
}

const updateSampleAnnotationResult = async function (taskId : number, sampleId : number,
                                                     data : any) {
    let res = await axiosInstance({
        url : `/api/v1/tasks/${taskId}/samples/${sampleId}`,
        method : 'PATCH',
        params : {
            sample_id : sampleId
        },
        data : {
            data : {result : data.result},
            // state : data.state
        }
    });
    return res;
}


export {
    createSamples,
    getTask,
    getSamples,
    getSample,
    getPrevSamples,
    updateSampleState,
    updateSampleAnnotationResult
};
