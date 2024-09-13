import {Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text} from "@chakra-ui/react";
import {useLoaderData} from "react-router-dom";

const Hub = () => {
    const hubInfo = useLoaderData();
    console.log(hubInfo);
    return <Card>
        <CardHeader>
            <Heading size='md'>{hubInfo.name}</Heading>
        </CardHeader>

        <CardBody>
            <Stack divider={<StackDivider/>} spacing='4'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        Description
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                        {hubInfo.description}
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        Stats
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                        Members: {hubInfo.totalMembers}
                    </Text>
                </Box>
            </Stack>
        </CardBody>
    </Card>
}
export default Hub;