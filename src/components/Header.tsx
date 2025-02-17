import { Group, ActionIcon, useMantineColorScheme, useComputedColorScheme, Flex, Image, Text } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

import btcLogo from "../assets/bitcoin_small.png";

enum THEMES {
    LIGHT = "light",
    DARK = "dark",
}

function Header() {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme(THEMES.LIGHT, { getInitialValueInEffect: true });

    return (
        <Group px="xl" h="100%" justify="space-between">
            <Flex h="100%" gap="md" justify="center" align="center">
                <Image h={54} src={btcLogo} alt="BTC Logo" />
                <Text size="xl" tt="uppercase" fw={700}>
                    Bitcoin Stats
                </Text>
            </Flex>
            <Group>
                <ActionIcon
                    onClick={() => setColorScheme(computedColorScheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT)}
                    variant="light"
                    color="gray"
                    size="xl"
                    aria-label="Toggle color scheme"
                    radius="lg"
                >
                    {computedColorScheme === THEMES.DARK ? <IconSun /> : <IconMoon />}
                </ActionIcon>
            </Group>
        </Group>
    );
}

export default Header;
