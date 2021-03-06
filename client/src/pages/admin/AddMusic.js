import { useState, useEffect } from 'react';
import { API } from '../../config/api'

import { Alert } from '@material-ui/lab';

import AdminHeader from '../../components/base/AdminHeader';
import Loading from '../../components/spinner/Loading';

import './AddMusic.css'

/**
 * TODO 1: Desing Add music display/form
 * TODO 2: Init state and function for add music
 * TODO 3: Set Up Model and API at the backend
 */

const AddMusic = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [attache, setAttache] = useState(null)
  const [artistId, setArtistId] = useState('')
  const [artists, setArtists] = useState(null)

  const loadArtists = async () => {
    try {
      const SUCCESS = 200

      const response = await API.get('/artists')

      if (response.status === SUCCESS) {
        const artistsList = response.data.data
        setArtists(artistsList)
      }
    } catch (err) {
      alert(err)
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)

      if (thumbnail === null) {
        setIsLoading(false)
        setAlert(
          <Alert style={{ textAlign: 'left' }} severity="warning">Select thumbnail file</Alert>
        )
        setTimeout(() => setAlert(false), 5000)
        return
      }

      if (attache === null) {
        setIsLoading(false)
        setAlert(
          <Alert style={{ textAlign: 'left' }} severity="warning">Select music file</Alert>
        )
        setTimeout(() => setAlert(false), 5000)
        return
      }

      if (isNaN(year)) {
        setIsLoading(false)
        setAlert(
          <Alert style={{ textAlign: 'left' }} severity="warning">Year input must contain valid years</Alert>
        )
        setTimeout(() => setAlert(false), 5000)
        return
      }

      if (artistId === '') {
        setIsLoading(false)
        setAlert(
          <Alert style={{ textAlign: 'left' }} severity="warning">Select singer/band</Alert>
        )
        setTimeout(() => setAlert(false), 5000)
        return
      }

      const SUCCESS = 200
      const config = {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }

      const formData = new FormData()
      formData.set("title", title)
      formData.set("year", year)
      formData.set("image", thumbnail, thumbnail.name)
      formData.set("audio", attache, attache.name)
      formData.set("artistId", artistId)

      const response = await API.post("/music", formData, config)

      setTimeout(() => {
        if (response.status === SUCCESS) {
          setTitle('')
          setYear('')
          setThumbnail(null)
          setArtistId('')
          setAttache(null)

          setIsLoading(false)
          setAlert(
            <Alert style={{ textAlign: 'left' }} severity="success">Music has been saved</Alert>
          )
          setTimeout(() => setAlert(false), 5000)
        }
      }, 2000)

    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong'
      setIsLoading(false)
      setAlert(
        <Alert style={{ textAlign: 'left' }} severity="error">
          {message}
        </Alert>
      )
      setTimeout(() => setAlert(false), 5000)
    }
  }

  const handleUploadFileImageChanges = (e) => {
    const uploaded = e.target.files[0]
    setThumbnail(uploaded)
    // const uploadedPath = URL.createObjectURL(uploaded)
    // setImagePreview(uploadedPath)
  }

  const handleUploadFileAudioChanges = (e) => {
    const uploaded = e.target.files[0]
    setAttache(uploaded)
    // const uploadedPath = URL.createObjectURL(uploaded)
    // setImagePreview(uploadedPath)
  }

  useEffect(() => {
    loadArtists()
  }, [])

  return (
    <div className='add-music'>
      <AdminHeader />
      <div className="form-wrapper">
        <div className="title">
          <h2>Add Music</h2>
        </div>
        {alert && alert}
        <div className="form">
          <form onSubmit={onSubmitHandler}>
            <div className="input-group">
              <input
                className="title-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <div className="upload-btn-wrapper">
                <button className="btn flex attache-cover btn-upload" disabled>
                  <span>Attache Thumbnail</span>
                  <img src="/attache-image.png" alt="..." />
                </button>
                <input
                  type="file"
                  name="image"
                  onChange={handleUploadFileImageChanges}
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Year"
              value={year}
              onChange={e => setYear(e.target.value)}
              required
            />
            <select
              onChange={e => setArtistId(e.target.value)}
              value={artistId}
            >
              <option value="">Singer</option>
              {artists &&
                artists.map((artist, index) => (
                  <option key={index} value={artist.id}>{artist.name}</option>
                ))}
            </select>
            <div className="upload-btn-wrapper upload-attache-control">
              <button className="btn btn-upload" disabled>Attache</button>
              <input
                type="file"
                name="audio"
                onChange={handleUploadFileAudioChanges}
              />
            </div>
            <button className="btn btn-submit" disabled={isLoading}>
              {isLoading ? (
                <div className="center">
                  <Loading type="bubbles" color='white' />
                </div>
              ) : "Add Music"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddMusic
