import s from "../ProfilePhoto/ProfilePhoto.module.css";
import userPhoto from "../../../assets/images/userPhoto.png";
import Button from "@material-ui/core/Button";
import * as React from "react";
import Preloader from "../../Common/Preloader/Preloader";


const ProfilePhoto = (props) => {

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    if (!props.userProfile) {
        return <div><Preloader/></div>
    }
    return (
        <div className={s.profilePhoto}>
            <img src={props.userProfile.photos.large !== null ? props.userProfile.photos.large : userPhoto}/>
            <div>

                {props.isOwner && <label htmlFor="upload-photo">
                    <input
                        style={{display: 'none'}}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={onMainPhotoSelected}
                    />
                    <Button color="primary" variant="contained" component="span" size="small">
                        Update photo
                    </Button>
                </label>}
            </div>
        </div>
    )
}

export default ProfilePhoto