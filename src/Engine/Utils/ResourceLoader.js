
/**
 * ResourceLoader - Description
 *
 * @param {string} url -the url of the resources
 *
 * @return { Promise } A Promise
 */
function ResourceLoader (url) {
  return new Promise(function (resolve, reject) {
    let image = new Image()

    image.onload = function () {
      resolve(image)
    }

    image.onerror = function () {
      reject(new Error('Could not load resource at ' + url))
    }

    image.src = url
  })
}

export default ResourceLoader
