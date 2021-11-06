import React from "react"
import { Link } from 'react-router-dom'
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from '@material-ui/core'

const User = ({ user }) => (
  <TableRow>
    <TableCell>
      <Button component={Link} to={`/users/${user.id}`}>
        {user.username}
      </Button>
    </TableCell>
    <TableCell>
      {user.blogs.length}
    </TableCell>
  </TableRow >
)

const Users = ({ users }) => (
  <div>
    <h2>Users</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>fuck</TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user =>
            <User user={user} key={user.id} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

export default Users