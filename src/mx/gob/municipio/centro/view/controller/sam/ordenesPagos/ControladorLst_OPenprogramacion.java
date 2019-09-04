package mx.gob.municipio.centro.view.controller.sam.ordenesPagos;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import mx.gob.municipio.centro.model.gateways.sam.GatewayOrdenDePagos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/sam/ordenesdepago/lst_OPenprogramacion.action")
public class ControladorLst_OPenprogramacion extends ControladorBase{

	
	private static Logger log = Logger.getLogger(ControladorLst_OPenprogramacion.class.getName());
	public ControladorLst_OPenprogramacion() {
		// TODO Auto-generated method stub

	}
	
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	@Autowired
	GatewayOrdenDePagos gatewayOrdenDePagos;
	@Autowired 
	GatewayMeses gatewayMeses;
	
	@SuppressWarnings("unchecked")	
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})  
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		
		int mActual = getJdbcTemplate().queryForInt(" SELECT MES FROM MESES WHERE ESTATUS='ACTIVO' ");
		int mes = request.getParameter("mes")==null ? mActual : Integer.parseInt(request.getParameter("mes"));
		int moment = request.getParameter("momento")==null ? 0 : Integer.parseInt(request.getParameter("momento"));
		String num_op = request.getParameter("txtsearchop");
		String fechamovto=request.getParameter("txtfechanueva2");
		int listado = 0;
		
		modelo.put("mes", request.getParameter("mes")==null ? mActual : request.getParameter("mes"));
		modelo.put("momento", request.getParameter("momento")==null ? 0 : request.getParameter("momento"));
		modelo.put("txtsearchop", num_op);
		modelo.put("txtfechanueva2",fechamovto);
		
		modelo.put("lst_OPenprogramacion", this.ordenesPagoRecibidas(Integer.parseInt(modelo.get("mes").toString()),moment,num_op,fechamovto));
	    return "sam/ordenesdepago/lst_OPenprogramacion.jsp";
	}
	
	public List<Map<String, Object>> ordenesPagoRecibidas(int mes, int moment,String num_op, String fechamovto){
		return this.gatewayOrdenDePagos.getListadoOrdenesPagoenProgramacion(mes,moment, this.getSesion().getEjercicio(),num_op,this.formatoFecha(fechamovto));
	}
	
		//Validación de la OP por la recepción, cuando esta ingresa a la Direccón de Programación
		public void fechaValidacionOrdenPago(final List<Long> lst_ordenes, final String fecha){
			try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	                @Override
	    protected void   doInTransactionWithoutResult(TransactionStatus status) {
	                	for (Long cve_op :lst_ordenes) {	                		
	               		 gatewayOrdenDePagos.ingresoOPProgramacion(cve_op, fecha, getSesion().getEjercicio(), getSesion().getIdUsuario());
	                	}
	                } });
	                } catch (DataAccessException e) {            
	                    log.info("La Operacion de Validacion en Ordenes de Pago Ejercidas ha fallado");	                    
	                    throw new RuntimeException(e.getMessage(),e);
	                }
	                
		}
		//
		//Validación de la OP por la devolución, cuando esta es regresada por la Direccón de Programación
		public void toback(final List<Long> lst_ordenes, final String fecha, final String motivo){
			try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	                @Override
	    protected void   doInTransactionWithoutResult(TransactionStatus status) {
	                	for (Long cve_op :lst_ordenes) {	                		
	               		 gatewayOrdenDePagos.DevolucionOPPROG(cve_op, fecha, getSesion().getEjercicio(), getSesion().getIdUsuario(), motivo);
	                	}
	                } });
	                } catch (DataAccessException e) {            
	                    log.info("La Operacion de Validacion en Ordenes de Pago Recibidas ha fallado");	                    
	                    throw new RuntimeException(e.getMessage(),e);
	                }
	                
		}
		
		public List<Map<String, Object>> getConceptosRelaciones(Long folio){
			return this.getJdbcTemplate().queryForList(" SELECT OPRD.ID_RELACION, OPR.FOLIO,OPRD.ID_DETALLE, OPRD.CVE_OP,CONVERT(varchar(10), OPRD.FECHA, 103) AS FECHA  " + 
													   " FROM SAM_OP_RELACION_DETALLES OPRD  " +
													   " INNER JOIN SAM_OP_RELACION OPR ON OPR.ID_RELACION=OPRD.ID_RELACION AND OPR.TIPO_RELACION='ENVIO' " +
													   " WHERE OPR.FOLIO =? AND EXISTS(SELECT * FROM SAM_ORD_PAGO OP WHERE OP.CVE_OP=OPRD.CVE_OP AND FECHA_RECEP_F IS NULL )"  + 
													   " ORDER BY OPR.FOLIO ", new Object[]{folio});
			
		}
		public void RecibidasFin(final List<Long> lst_ordenes, final String fecha, final String motivo){
			try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
		            @Override
		            protected void   doInTransactionWithoutResult(TransactionStatus status) {
		            	for (Long cve_op :lst_ordenes) {	                		
		            		gatewayOrdenDePagos.RecibidoFinanzas(cve_op, fecha, getSesion().getEjercicio(), getSesion().getIdUsuario(), motivo);
		                }
		            } 
	            });
	        } catch (DataAccessException e) {            
	        	log.info("La Operacion de Validacion en Ordenes de Pago Recibidas ha fallado");	                    
	            throw new RuntimeException(e.getMessage(),e);
	        }
		}
}
