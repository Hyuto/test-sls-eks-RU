FROM apache/superset

USER root

RUN pip install mysqlclient

COPY ./init.sh /init.sh

COPY superset_config.py /app/
ENV SUPERSET_CONFIG_PATH /app/superset_config.py

USER superset
ENTRYPOINT [ "/init.sh" ]