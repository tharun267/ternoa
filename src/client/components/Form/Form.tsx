
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

export type Signature = { title: string, description: string, imageUrl: string, id?: number };

type Props = {
    modalProps: UseDisclosureProps;
    signature?: Signature;
    setCurrentSignature: React.Dispatch<React.SetStateAction<Signature>>;
}

const Form: React.FC<Props>
    = ({ modalProps: { isOpen, onClose }, signature: updateSignature, setCurrentSignature }) => {
        const [loading, setLoading] = React.useState<boolean>(false);
        const router = useRouter();
        const [signature, setSignature] = React.useState<Signature>({
            title: '',
            description: '',
            imageUrl: '',
        });

        React.useEffect(() => {
            if (updateSignature) {
                setSignature(updateSignature);
            }
        }, [updateSignature]);

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
            const url = signature?.id ? `http://localhost:3000/signature/${signature.id}` : "http://localhost:3000/signature/";
            const response = await fetch(url, {
                method: signature?.id ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signature)
            });
            await response.json();
            setLoading(false);
            handleClose();
            router.replace(router.asPath);
        }

        const handleClose = () => {
            onClose();
            setCurrentSignature({
                title: '',
                description: '',
                imageUrl: '',
            });
        }

        return (
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{signature?.id ? 'Update' : 'Create'} Signature</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                value={signature.title}
                                placeholder='Title'
                                onChange={evt => setSignature({ ...signature, title: evt.target.value })}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                value={signature.description}
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
                        <Button onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

export default Form;