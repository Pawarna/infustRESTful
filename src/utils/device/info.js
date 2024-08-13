import useragent from 'useragent';

export const getDeviceInfo = (req) => {
    const agent = useragent.parse(req.headers['user-agent']);
    const deviceInfo = {
        deviceName: agent.toString(),
        deviceType: agent.device.family,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
    }

    return deviceInfo;
};