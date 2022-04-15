import { Appwrite } from 'appwrite';
import { createState, Downgraded } from '@hookstate/core';
import appWriteConfig from '../appwrite.config.json'; // create this file

const appWriteSDK = new Appwrite();

const appWriteEndpoint = appWriteConfig?.endpoint || 'http://localhost/v1';
const appWriteProjectId = appWriteConfig?.projectId || 'your-project-id';

appWriteSDK.setEndpoint(appWriteEndpoint).setProject(appWriteProjectId);

export const appWriteStore = createState<Appwrite>(appWriteSDK);

export const getAppWriteSDK = () => {
  return appWriteStore.attach(Downgraded).get();
};
