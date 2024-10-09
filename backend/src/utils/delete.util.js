import fs from 'fs'

async function deleteFile(imagePath) {
  fs.unlink(`./backend/public${imagePath}`, (err) => {
    if (err) {
      throw new Error(err);
    }
  })
}

export { deleteFile }