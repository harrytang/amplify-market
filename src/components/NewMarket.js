/*
 * @Author: Harry Tang - harry@powerkernel.com
 * @Date: 2020-01-15 19:01:02
 * @Last Modified by: Harry Tang - harry@powerkernel.com
 * @Last Modified time: 2020-01-15 23:43:23
 */
import React from "react";
import { withSnackbar } from "notistack";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import ChipInput from "material-ui-chip-input";

import { API, graphqlOperation } from "aws-amplify";
import { createMarket } from "../graphql/mutations";

import { UserContext } from "../App";

function NewMarket({enqueueSnackbar}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [tags, setTags] = React.useState([]);
  //const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTagsChange = chips => {
    setTags(chips);
  };

  const handleNewMarket = async user => {
    try {
      const input = {
        name,
        tags: tags,
        owner: user.username
      };
      //console.log(input);

      const res = await API.graphql(graphqlOperation(createMarket, { input }));

      console.info(`market created: ${res.data.createMarket.id}`);

      setName("");
      setTags([]);
      handleClose();
      enqueueSnackbar('Market created successfully', {variant: "success"});
    } catch (err) {
      console.error("Error creating maeket: ", err);
    }
  };

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add new market
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add new market</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Market name"
                type="text"
                fullWidth
                onChange={e => setName(e.target.value)}
                value={name}
              />
              <ChipInput
                label="Tags"
                defaultValue={tags}
                onChange={chips => handleTagsChange(chips)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={() => handleNewMarket(user)}
                color="primary"
                disabled={!name}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </UserContext.Consumer>
  );
}

export default withSnackbar(NewMarket);
