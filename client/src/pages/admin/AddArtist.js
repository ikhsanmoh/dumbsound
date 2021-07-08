import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { API } from '../../config/api'

import Navbar from '../../components/navigation/Navbar';
import Button from '../../components/button/Button'
import RoundedImage from '../../components/frame/RoundedImage';

import './AddArtist.css'

const AddArtist = () => {
  const [state, dispatch] = useContext(UserContext)
  const [name, setName] = useState('')
  const [old, setOld] = useState('')
  const [type, setType] = useState('')
  const [startCareer, setStartCareer] = useState('')

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      if (isNaN(old)) return alert('Old input must contain number.')
      const SUCCESS = 200
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const oldInt = +old
      const body = JSON.stringify({
        name,
        old: oldInt,
        type,
        startCareer
      })

      const response = await API.post("/artist", body, config)

      if (response.status === SUCCESS) {
        setName('')
        setOld('')
        setType('')
        setStartCareer('')

        alert('Artsit Added.')
      }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <Navbar logout={logout} />
      </div>

      <div className="form-wrapper">
        <div className="title">
          <h2>Add Artist</h2>
        </div>
        <div className="form">
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Old"
              value={old}
              onChange={e => setOld(e.target.value)}
              required
            />
            <select
              onChange={e => setType(e.target.value)}
              value={type}
            >
              <option value="">Type</option>
              <option value="solo">Solo</option>
              <option value="band">Band</option>
            </select>
            <input
              type="text"
              placeholder="Start Career"
              value={startCareer}
              onChange={e => setStartCareer(e.target.value)}
              required
            />
            <div className="submit">
              <Button text='Add Artist' className="btn btn-submit" onClick={() => { }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddArtist
