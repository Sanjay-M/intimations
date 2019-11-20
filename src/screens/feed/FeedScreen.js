import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import { SpinnerWrapper } from '../../common/StyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionComponent from './components/SectionComponent';
import shortid from 'shortid';

const FeedScreen = ({ activeIntimations, pullToRefresh, fetchActiveIntimations }) => {
    const onRefresh = () => fetchActiveIntimations();

    if (!activeIntimations || activeIntimations.length === 0)
        return (
            <SpinnerWrapper>
                <WaveIndicator color="#000000" />
            </SpinnerWrapper>
        );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFCFC' }}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }}
                refreshControl={<RefreshControl progressViewOffset={20} refreshing={pullToRefresh} onRefresh={onRefresh} />}
            >
                {Object.keys(activeIntimations).map((key, _) => {
                    return <SectionComponent key={shortid.generate()}
                        activeIntimations={activeIntimations[key]}
                        lastModified={key}
                    />
                })}

            </ScrollView>
        </SafeAreaView>
    );
};

FeedScreen.navigationOptions = {
    title: 'Feed',
    tabBarIcon: ({ focused }) => {
        let i = focused ? <FontAwesomeIcon icon={'bell'} size={29} color={'#3780BE'} />
            : <FontAwesomeIcon icon={'bell'} size={29} color={'#393939'} />
        return i;
    }
}

export default FeedScreen;
