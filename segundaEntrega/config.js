export default {
  fileSystem: {
    path: './DB',
  },
  mongodb: {
    cnxStr: 'mongodb://root:mongopassword@localhost:27017/coderhouse',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {
    type: 'service_account',
    project_id: 'coderhouse-61825',
    private_key_id: '8d2f0a89d8c7b42b8a7abc8dc6a02958c59b1e26',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRMNU3gNPkPNOv\nwWlqRCm4x3ym2/pH1d5MvaLOpTIqGX6R0QEp7EG0WdzLdPYGCMYIzokb6Rw+fFtM\nlQPooRJuj9RUWBO+4OH8R0hrWS4HXhsYE3KNPTiMUlMU9OpuTLd+kOzyZpSFxU4C\nR84Uj0wJKbt6TDeoRJVHT6dUyeuLual6jx/Px9I/soGGqRo0zTxfIcvaFtTt5Img\nvA3W9T54Y7R49vD534YYxCeWpZGaNgs7K4s2Sb6SWJUPS3X0eLWDzBzP92BWYewV\naJ4/6OWcgSvAfDJT9Mcnd92JDi7Uf+AALHtVB5lbg5rqGrLeOYIiszm8kQlqtAId\ns8huvBWHAgMBAAECggEACo/yjZrJ+hT8Erwk+WhuCermmZOajeFJeRcOogPd4LbW\nwLA4v8kChVFIQRDdg6uIZJmfMIWb2rvclHdUFSH/9O/HsunEE03JguXYpzPnUlKO\nnAjGJkTpjo5qoYqpB08oxi9a3XjdndcFtCAZ0OBqgqbOObkTuiJgeGibXrgLHQX6\nTcQ3fbBRLZy3Ntnx+PCHkKUVk6F6QbN9cdQZZrRBFhpAF4oHxo99cwJXFCNyUIya\nCvHyCmCMxypCi3TycJCw+Cs1z5dRTfgYUOKfojsHC5ryrnEBMo1dqQvGHivucHwy\n3YRIrF7bpyr5t7DfS/s/tHb0kdfXCg4PkjGhDdGtEQKBgQDDPDaH+dxGC5Y+eMvs\nnaBJLYfJjSf0QZNARYUitljmO8HWzhQwpHXkZh/2oNBU0U5DWnNLJ7XGP30FWR9E\n3cAcB5PiEfOzXSfjr4Mfbs4+1xft4q85Z5hexsl84K7jTabGvFp8OhNOKbybc/vq\nDcOufdj7rF5aLlmn75l7ZK62nwKBgQC+YThKaZd8fhub6ClYUe+MqaWPNinb1LpJ\nzfenRHYyWERj6pjnWylgRT13y0vTT2FQhSubFqd9IHQyNT4Kvat4IVcRxAV0BgU8\nO5H0Lx/YVV4qQ8Q4uAghg49C7nWimQQybWh1KdXGmiUGJ8iIcRq5HbhpqBRIE0ns\nfEEJnCvAGQKBgQCZOzAdhvjgrQVt4MdE3e5IoQibI0PBjJoy7p1wwieCBFK98h6c\nkufIrHLX0h3RBDnl2R72VKNxhrDsOqe1GEpIdZYW8DoSg8HkDQPf7srHPXCVj74x\nUuKfOGw5q+r3kiGch4aJS9eNGGrko6KLb+Qulq1v0jh3lTte+EnBNCOARwKBgF5u\nJJisVWp3tsQXXOKlCZgQ0cD+UbbrhldzZWK/T41bQNj6lUs0aYqJ7ZpM6Vhv6Eoj\nM+TiUMN85IW+6P405CdbCjAStc296rzco2GmOjp45ZM7N8oWZloRQm8ljo3PLkjB\nAe4TiSjQbormEs6yo1msxzsJFr5FawZ0/2F/6CeJAoGAYIx+FnnT0bRzB+Ul3/YB\n5uWtcaFWAmwuFAhfLBo+tjk6K1HmOi47wAwyaTm8aRV2JuGngTCsZayCBR2ACWUe\nu2NUMiZ8p3OrComID/3sVETtIF0Loa1uS6t/YtNYoZBBSXFBrhYsIZOpFooyUFaP\nbU1/E9C3H8AymrWjk25hDO8=\n-----END PRIVATE KEY-----\n',
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
