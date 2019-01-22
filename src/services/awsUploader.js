/**
 * Class S3PresignedUrl
 *
 * methods:
 * sendFile(presignedurl: String, file: { uri: String, type: String, name: String }, onProgress: (progress) => void )
 */

class S3PresignedUrl {
    progress = 0
    progressInterval = null
    file = null
    sendFile(presignedurl, file, onSuccess) {
        this.file = file
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.upload.addEventListener(
                'progress',
                e => {
                    this.progress = Math.floor((e.loaded / e.total) * 100)
                },
                false
            )
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        onSuccess(file.name)
                        //resolve(file.name)
                        clearInterval(this.progressInterval)
                    } else {
                        reject({ status: xhr.status, error: xhr.statusText })
                        clearInterval(this.progressInterval)
                    }
                }
            }

            xhr.open('PUT', presignedurl)
            // for text file: text/plain, for binary file: application/octet-stream
            xhr.setRequestHeader('Content-Type', file.type)
            xhr.send(file)
        })
    }
    getProgress(onProgress) {
        this.progressInterval = setInterval(() => onProgress(this.progress, this.file.name), 1000)
    }
}
export { S3PresignedUrl }
