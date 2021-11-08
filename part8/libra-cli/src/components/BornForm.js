import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_AUTHORS_NAMES, UPDATE_AUTHOR_BORN } from '../queries'
import { useField } from '../hooks'


const BornForm = () => {
  const born = useField('')
  const [selectedName, setSelectedName] = useState('')

  const { loading, error, data } = useQuery(ALL_AUTHORS_NAMES)

  const [updateAuthorBorn] = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (e) => {
    e.preventDefault()

    console.log('update author...')

    updateAuthorBorn({
      variables: {
        name: selectedName,
        born: Number(born.value)
      }
    })
    born.reset()
  }

  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  }


  const options = data.allAuthors.map(
    a => ({
      value: a.name,
      label: a.name
    })
  )

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <label>
          current author:
        </label>
        <Select
          defaultValue={selectedName}
          onChange={({value})=>setSelectedName(value  )}
          options={options}
        />
        <div>
          born <input {...born.props} />
        </div>
        <button type='submit'>
          update author
        </button>
      </form>
    </div>
  )
}

export default BornForm