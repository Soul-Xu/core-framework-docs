import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '快速搭建',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        使用该基础框架，可以快速完成后台管理类项目的搭建，并精准快速地孵化出新的应用
      </>
    ),
  },
  {
    title: '服务端渲染',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        采用主流的服务端渲染框架，在前端展示部分使用nextjs框架，中间层采用nestjs框架来实现前端自身的服务器逻辑
      </>
    ),
  },
  {
    title: '技术前沿',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        整体底层框架为react，作为前端主流的框架之一的react一直处于领先地位，并且它的众多优秀特性也被vue3等优秀框架引用学习
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
