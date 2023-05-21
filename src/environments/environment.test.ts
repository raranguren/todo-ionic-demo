/** 
 * To use in spec.ts files imports for TestBed:
 * imports: [
 *     . . .
 *     provideFirebaseApp(() => initializeApp(environment.firebase)),
 *     provideFirestore(() => getFirestore()),
 *     . . .
 * ],
 */
export const environment = {
  firebase: {
    projectId: '',
    appId: '',
    storageBucket: '',
    apiKey: '',
    authDomain: '',
    messagingSenderId: '',
  },
  production: false
};
