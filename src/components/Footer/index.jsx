import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '在下月亮有何贵干',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'moon front-end',
          title: 'moon front-end',
          href: 'https://gitee.com/csj1328059093/moon-front-end',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/csj1328059093',
          blankTarget: true,
        },
        {
          key: '月亮的博客地址',
          title: '月亮的博客地址',
          href: 'https://blog.csdn.net/weixin_43877799',
          blankTarget: true,
        },
      ]}
    />
  );
};
