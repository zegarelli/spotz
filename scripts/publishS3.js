
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const AWS = require('aws-sdk')

const pjson = require('../package.json')

const AWS_KEY = process.env.AWS_KEY
const AWS_SECRET = process.env.AWS_SECRET
const S3_BUCKET = process.env.S3_BUCKET
const S3_STORAGE_TYPE = 'STANDARD'
const S3_ACL = 'public-read'

if (!AWS_KEY || !AWS_SECRET || !S3_BUCKET) {
  throw new Error('Failed to find env vars for s3 config!')
}

const s3 = new AWS.S3({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET
})

function makeS3FileName (filePath) {
  if (filePath.match(/^\d.*.js$/)) {
    return `builds/${pjson.version}/build-chunk.js`
  } else if (filePath.match(/^main.*.js$/)) {
    return `builds/${pjson.version}/main-chunk.js`
  } else if (filePath.match(/^runtime-main.*.js$/)) {
    return `builds/${pjson.version}/runtime-main.js`
  }
}

const uploadFile = (file, dir) => {
  const filePath = path.join(dir, file)
  const fileContent = fs.readFileSync(filePath)
  const filename = makeS3FileName(file)

  if (filename) {
    const params = {
      Bucket: S3_BUCKET,
      StorageClass: S3_STORAGE_TYPE,
      ACL: S3_ACL,
      Key: filename,
      ContentType: mime.getType(filePath),
      Body: fileContent
    }

    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log('File uploaded successfully.', filePath)
    })
  }
}

// const inS3 = (filePath, callback) => {
//   const filename = filePath.replace('static/', '')

//   const params = {
//     Bucket: S3_BUCKET,
//     Key: filename
//   }
//   s3.getObject(params, callback)
// }

function getfiles (dir) {
  // const filelist = []
  const files = fs.readdirSync(dir)
  return files
}

if (process.argv[2] === 'upload') {
  const buildDir = './build/static/js'
  const files = getfiles(buildDir)
  files.forEach(file => {
    // console.log("File: ", path.basename(file))
    uploadFile(file, buildDir)
  })
} else {
  console.error('Invalid argument', process.argv[2])
}
