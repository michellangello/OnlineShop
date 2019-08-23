import React, { Component, useState, useEffect } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

const ImageDropZone = (props) => {
    return (
        <DropzoneArea
            onChange={props.onChange}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={true}
            maxFileSize={5000000}
            filesLimit={10}
            showPreviewsInDropzone={false}
        />
    )
}


export default ImageDropZone;

