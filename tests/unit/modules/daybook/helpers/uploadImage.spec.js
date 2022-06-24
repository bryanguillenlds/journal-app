import 'setimmediate';
import cloudinary from 'cloudinary';
import uploadImage from '@/modules/daybook/helpers/uploadImage';
import axios from 'axios';


cloudinary.config({
  cloud_name: 'bryancloud',
  api_key: '974211245956637',
  api_secret: '6FVNwPyC6ZxoFPk3W41K9EweNBE'
})

describe('UploadImage Helper', () => {
  it('should upload a file and return a secure url', async (done) => {
    const {data} = await axios.get('https://res.cloudinary.com/bryancloud/image/upload/v1655952090/ueipxsag0msdqlju9jfe.jpg', {
      responseType: 'arraybuffer'
    });

    const file = new File([data], 'pic.jpg');

    const url = await uploadImage(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  })
})