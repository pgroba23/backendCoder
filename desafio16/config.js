export default {
  fileSystem: {
    path: './src/DB',
  },
  mongodb: {
    //cnxStr:
    //'mongodb://admin:mongopassword@localhost:27017/coderhouse?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    cnxStr: `mongodb+srv://pablodb:pablodb@cluster0.rv6li.mongodb.net/test?authSource=admin&replicaSet=atlas-131lsw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {
    type: 'service_account',
    project_id: 'coderhouse-61825',
    private_key_id: 'b45a980ef6fbf4e890557118dd4cd243d893f25a',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCae6jFhkny14DJ\nOt5REm7ZXUGQQedQV0rd3Xjpa+hZ79tPvn2yP5hNtxXddUPgI/sNuElQK1h5TG/w\nw3bt8lRljpqDxvDoOeb423uE+NyMmyp1xgTPDCbHVSXukokDQ8y0CY0LtywK+Z6i\nDrHto+UxfOqUd78GqzYi7VEN/ReUxe4khjMYQRgZj5tTogjkJgi9NKzDFva1iEWq\nNJWAy2JH+bAhWpEFDBlduvTLJ4L1/806dt9JBgBsbx42Wsw0md1uRGDOr+WefFAo\nn8GUzTE7Fa6suRJkLljy6TTN3nS9ehnf0/NDQfM97/eSOV6AGP5Hod4ub9wACMah\n4aS4Gu4vAgMBAAECgf81JJliBJ0nhrbYHGg8JixAM+WeVEDHUYSAzmtBWN23rFQ9\nK6ASBwHEQuIgkTaVKP68/cqhDeHZLdjL2E/vRvZsPaJhboYcB/Fb7vH1Zg1n6uf0\nrQgLh0S+xUetqHbxQi5tnrleLD7HQ35OyhSvvI/XdmXEz2zWiSCN9GsP7WdzksUq\n75m6OQuFIdJt8oEoUQJ6z8hhEHbH0rRHC0dYaN5Hq5EKJWnM4EoG40XzlGmvSu9S\n21kmPf0OrFhlrscGojIl9I4EBks+vyYAzAjK5FPe0hDwaLG4qXcHJQ/SanBdFjyb\nY0DIQFa3s/qkjjXo/86zBhi5Tr3FY0JxUoCydyECgYEA0KzEzOavAv8TUeKt5mNN\nOZ46PvjqC2qixDylvNZrdEXvBODhnm7Afi27A2/pIcNAfJWvdSSEvtFimVwTRuvY\nMABQlS4z5X91LaI0cgPr6yXSt55svjeDb2SmIFmR5szL/kZDLDo4xCUMUKXXQ6kd\nn9daZcp0IxeuGeoGsXuC/D8CgYEAvYSf9yj513MdfzvAAKwyDJB6ibj8JtmpkjB4\nTMcv1FxViAzKL8mVkZYAbUT/Tpm7Ydf24OtdMpabJIbd+jaCDNQHdORfMbkrMvMa\nALkEADvIepCAjlIyacdnDu5bTLEjWewM0vGrz9d1rzhYpcq+kFgoebSWwsGbszgB\nSTlkUhECgYEAwu6xxQs1r+HiBVtwwcg/qrRhitPxpoqN1C0nUhknNe3iUzdT7DFf\nhj9n9NUE/jIsOnWF+zMLAkoNBmAZ7eWBBY41uLX5asi/CMr+nQeGyhqCFl9bC/JF\nyLhH6+5gOi9T3It8UoNs5eYJ9AiH57/CWb/NxUrzZJjJXZHdgMx1VvcCgYB1s26d\n0+cG9cl2AafHQyp6Pyi7bBW+EySLVGsCVBrSat379uWDNFEd7+kn89gT+sozhCsh\nmUtyZbLIxrIJ+dxfFzfiUwsEGJpJtE2L8VwYwQhLhn8w5L/Gjj7lOQee48yuxjlY\nsRshpBDE19vGa9paT0YkABI5toB6l+fEkE5L4QKBgQC9DvHvy2EsJOPaJ2+YOhLZ\nS+nnU5b5C0snacd2uHlbcPhi1iE0x2+FJ+nkFuQPJP+jwuoBOcVMZ6OGKrLnBj8b\nwA25dXXT9Z/5iKQ5w6Hd/9Vj9WkAXrJ9JZa3DUGUKwQFg1ubuEqSu89nAxf/3Bmy\nG3l9m9/waZQhSPw8wJUbcQ==\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-pos2s@coderhouse-61825.iam.gserviceaccount.com',
    client_id: '109566843403701731411',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pos2s%40coderhouse-61825.iam.gserviceaccount.com',
  },
};
