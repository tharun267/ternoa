
import React from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    UseDisclosureProps
} from "@chakra-ui/react";
import Image from 'next/image';
import { useRouter } from 'next/router';

export type Signature = { title: string, description: string, imageUrl: string };

const Form: React.FC<Partial<UseDisclosureProps>> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const [signature, setSignature] = React.useState<Signature>({
        title: '',
        description: '',
        imageUrl: '',
    });

    const handleFileUpload = async (evt) => {
        const uploadData = new FormData();
        setLoading(true);
        uploadData.append('file', evt.target.files[0]);
        const response = await fetch("http://localhost:3000/signature/image/upload", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: uploadData
        });
        const result = await response.json();
        setLoading(false);
        setSignature({ ...signature, imageUrl: "http://localhost:3000" + result.fileName });
    };

    const handleSaveSignature = async () => {
        setLoading(true);
        const response = await fetch("http://localhost:3000/signature/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signature)
        });
        await response.json();
        setLoading(false);
        onClose();
        router.replace(router.asPath);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Signature</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder='Title' onChange={evt => setSignature({ ...signature, title: evt.target.value })} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder='Description'
                            size='sm'
                            onChange={evt => setSignature({ ...signature, description: evt.target.value })}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Upload Signature</FormLabel>
                        <input type='file'
                            accept="image/png, image/gif, image/jpeg"
                            placeholder="Upload Signature"
                            onChange={handleFileUpload}
                        />
                    </FormControl>

                    {signature.imageUrl && <Box
                        h={"40"}
                        bg={'gray.100'}
                        mt={2}
                        pos={'relative'}>
                        <Image
                            src={signature.imageUrl}
                            layout={'fill'}
                        />
                    </Box>}
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='blue'
                        mr={3}
                        disabled={!signature.imageUrl || !signature.description || !signature.title || loading}
                        onClick={handleSaveSignature}
                        isLoading={loading}
                        >
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Form;