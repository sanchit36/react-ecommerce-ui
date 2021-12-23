import { MailOutline, PermIdentity, Publish } from '@material-ui/icons';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';
import './user.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { updateUser } from '../../api/users';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAxios from 'hooks/useAxios';

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === id)
  );

  const [inputs, setInputs] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    image: user.image,
  });

  const [file, setFile] = useState(null);
  const [api] = useAxios();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.promise(dispatch(updateUser(api, id, inputs)), {
        pending: 'Trying to update user',
        success: 'Updated successfully',
        error: {
          render: ({ data }) => {
            return `${data.message}`;
          },
        },
      });
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {
            ...inputs,
            image: downloadURL,
          };
          toast.promise(dispatch(updateUser(api, id, user)), {
            pending: 'Trying to update user',
            success: 'Updated successfully',
            error: {
              render: ({ data }) => {
                return `${data.message}`;
              },
            },
          });
        });
      }
    );
  };

  return (
    <DashboardLayout>
      <div className='user'>
        <div className='userTitleContainer'>
          <h1 className='userTitle'>Edit User</h1>
          <Link to='/dashboard/new-user'>
            <button className='userAddButton'>Create</button>
          </Link>
        </div>
        <div className='userContainer'>
          <div className='userShow'>
            <div className='userShowTop'>
              <img
                src={user.image}
                alt={user.username}
                className='userShowImg'
              />
              <div className='userShowTopTitle'>
                <span className='userShowUsername'>{user.username}</span>
                <span className='userShowUserTitle'>{user.fullname}</span>
              </div>
            </div>
            <div className='userShowBottom'>
              <span className='userShowTitle'>Account Details</span>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>{user.username}</span>
              </div>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>{user.firstName}</span>
              </div>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>{user.lastName}</span>
              </div>
              <span className='userShowTitle'>Contact Details</span>
              <div className='userShowInfo'>
                <MailOutline className='userShowIcon' />
                <span className='userShowInfoTitle'>{user.email}</span>
              </div>
            </div>
          </div>
          <div className='userUpdate'>
            <span className='userUpdateTitle'>Edit</span>
            <form className='userUpdateForm'>
              <div className='userUpdateLeft'>
                <div className='userUpdateItem'>
                  <label>Username</label>
                  <input
                    name='username'
                    value={inputs.username}
                    onChange={handleChange}
                    type='text'
                    placeholder='annabeck99'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>First Name</label>
                  <input
                    name='firstName'
                    value={inputs.firstName}
                    onChange={handleChange}
                    type='text'
                    placeholder='Anna'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>Last Name</label>
                  <input
                    name='lastName'
                    value={inputs.lastName}
                    onChange={handleChange}
                    type='text'
                    placeholder='Becker'
                    className='userUpdateInput'
                  />
                </div>
                <div className='userUpdateItem'>
                  <label>Email</label>
                  <input
                    name='email'
                    value={inputs.email}
                    onChange={handleChange}
                    type='text'
                    placeholder='annabeck99@gmail.com'
                    className='userUpdateInput'
                  />
                </div>
              </div>
              <div className='userUpdateRight'>
                <div className='userUpdateUpload'>
                  <img
                    className='userUpdateImg'
                    src={inputs.image}
                    alt={inputs.username}
                  />
                  <label htmlFor='file'>
                    <Publish className='userUpdateIcon' />
                  </label>

                  <input
                    type='file'
                    id='file'
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <button onClick={handleSubmit} className='userUpdateButton'>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default User;
